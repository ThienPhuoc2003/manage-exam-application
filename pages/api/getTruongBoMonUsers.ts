// pages/api/getTruongBoMonUsers.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const truongBoMonUsers = await prisma.user.findMany({
                where: {
                    role: "TRUONGBOMON"
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            res.status(200).json(truongBoMonUsers);
        } catch (error) {
            console.error("Error fetching truong bo mon users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
