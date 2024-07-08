import { NextRequest, NextResponse } from 'next/server';

import { url } from 'inspector';

export async function POST(request: NextRequest) {
    try {
        const { token, beginningDate , endDate, priority, status, typeOfTask, Belong, title, description, author, assignedTo, relatedTo } = await request.json();

        const url_to_fetch = `http://localhost:5101/Task/CreateTask`

        const response = await fetch(url_to_fetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ BeginningDate : beginningDate , EndDate : endDate, Priority : priority, Status : status, TypeOfTask : typeOfTask, Belong, Title : title, Description : description, Author : author, AssignedTo : assignedTo, RelatedTo : relatedTo}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || url_to_fetch);
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
