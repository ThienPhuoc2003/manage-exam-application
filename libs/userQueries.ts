// libs/userQueries.ts

import prisma from '@/libs/prismadb';
import { User } from '@prisma/client';

// Hàm lấy danh sách người dùng có vai trò 'truongbomon'
export async function getTruongBoMonUsers(): Promise<User[]> {
    try {
        const truongBoMonUsers = await prisma.user.findMany({
            where: {
                role: 'truongbomon',
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                hashedPassword: true,
                createdAt: true,
                updateAt: true,
                role: true,
            },
        });

        return truongBoMonUsers;
    } catch (error) {
        console.error('Error fetching Truong Bo Mon users:', error);
        throw new Error('Could not fetch Truong Bo Mon users');
    }
}
