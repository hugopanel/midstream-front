import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {

        const response = await fetch('http://localhost:5101/Team/GetProjects', {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to get projects');
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
