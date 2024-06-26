import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log('POST request');
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const description = formData.get('description');
        const belong = formData.get('belong');


        const data = new FormData();
        data.append('file', file);
        data.append('description', description as string);
        data.append('belong', belong as string);
        const response = await fetch("http://localhost:5101/Files/Upload", {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData.message || "Failed to upload file.");
        }

        const responseData = await response.json();

        return NextResponse.json(responseData, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


