import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
    try {
        const { email, newRole } = await request.json();

        // Kiểm tra xem các trường bắt buộc đã được cung cấp chưa
        if (!email || !newRole) {
            console.error('Email and new role are required');
            return NextResponse.json({ error: 'Email and new role are required' }, { status: 400 });
        }

        // Cập nhật role của người dùng
        console.log('Updating role for user with email:', email, 'to role:', newRole);
        const user = await prisma.user.update({
            where: { email },
            data: { role : newRole },
        });

        console.log('Role updated successfully for user with email:', email);
        return NextResponse.json(user);
    } catch (error: any) {
        // Ghi lại thông tin lỗi
        console.error('Error updating user role:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
