import bcrypt from "bcrypt"
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server"
export async function POST(request:Request) {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate input
    if (!name || !email || !password || !role) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            role,
        },
    });

    // Return the created user as the response
    return NextResponse.json(user);
}