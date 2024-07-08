import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const {documentId, title, projectId, newDate} = await request.json();

        const response = await fetch('http://localhost:5101/Document/UpdateDocument', {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ documentId, title, projectId, newDate}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            throw new Error(errorData.message || 'Failed to update team');
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
