import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const { headers } = request;
    const authorization = headers.get('authorization');

    if (!authorization) {
        return new Response('Missing authorization header', { status: 401 });
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
        return new Response('Missing token', { status: 401 });
    }

    // if token is invalid, return 401
    // TODO: Validate token is not expired
    // TODO: Validate if the token is assigned properly to the user
    if (token !== 'valid-token') {
        return new Response('Invalid token', { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/v1/user/profile',
    ]
}