
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { rateLimitCheck } from "@/lib/rateLimitCheck";

export async function GET(req: Request) {
    try {

        const rateLimitResponse = await rateLimitCheck(req);
        if (rateLimitResponse) return rateLimitResponse;
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const idea = await prisma.user.findUnique({
            where:{
                id: session?.user.id!
            },
            select:{
                name:true,
                email:true,
                image:true,
                credits:true
            }
        })

        return NextResponse.json(idea);
    } catch (error) {
        return NextResponse.json(error)
    }
}
