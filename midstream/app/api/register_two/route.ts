import { NextRequest, NextResponse } from 'next/server';

import { url } from 'inspector';

export async function POST(request: NextRequest) {
    try {
        const { token, username, firstname, lastname, password } = await request.json();

        const url_to_fetch = `http://localhost:5101/auth/ConfirmRegistration?token=${token}`

        const response = await fetch(url_to_fetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, username, firstname, lastname, password }),
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
