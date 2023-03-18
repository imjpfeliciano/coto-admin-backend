import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response('Missing email or password', { status: 400 });
        }

        const user = {
            id: '758611d7-1a16-46a4-a87c-0b37a5b05a62',
            email,
        }

        // TODO: Validate password with bcrypt
        const isValidPassword = password === 'test';

        if (!isValidPassword) {
            return new Response('Invalid password', { status: 401 });
        }

        const token = jwt.sign({
            userId: user.id,
        }, 'secret', {
            algorithm: 'HS256',
            expiresIn: '1h',
        });

        return Response.json({
            token,
            ...user,
        });
    } catch (error) {
        return new Response('Invalid JSON', { status: 400 });
    }


}