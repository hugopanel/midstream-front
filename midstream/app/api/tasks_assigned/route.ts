import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { projectId, userId } = await request.json();
        console.log(projectId, userId);
        const response = await fetch(`http://localhost:5101/Task/GetTasksByAssignee?projectId=${projectId}&userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to get teams');
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
