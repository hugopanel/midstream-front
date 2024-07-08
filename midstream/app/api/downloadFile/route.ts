import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {       
    const { fileId } = await request.json();
    const response = await fetch(`http://localhost:5101/Files/GetById?fileId=${fileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get files.");
    }

    const fileBlob = await response.blob();
    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
    const filename = filenameMatch ? filenameMatch[1] : "downloadedFile";
    console.log(`Downloaded file: ${filename}`);

    return new NextResponse(fileBlob, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
