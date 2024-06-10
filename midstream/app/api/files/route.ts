import { NextRequest, NextResponse } from 'next/server';

import { url } from 'inspector';

export async function GET(request: NextRequest){
    try {
        const response = await fetch("http://localhost:5101/files/getall", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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