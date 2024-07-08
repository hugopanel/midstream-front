import { NextRequest, NextResponse } from 'next/server';

import { url } from 'inspector';

export async function POST(request: NextRequest) {
    try {
        const { tasks } = await request.json();

        const response = await fetch('http://localhost:5101/Task/UpdateTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Unable to save the tasks");
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
