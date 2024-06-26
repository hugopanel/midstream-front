import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try {        

      const {projectId} = await request.json();
      const response = await fetch(`http://localhost:5101/Files/GetListByProject?projectId=${projectId}`, {
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

      const data = await response.json();

      return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}