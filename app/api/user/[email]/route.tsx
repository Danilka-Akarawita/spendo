import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


type Params = Promise<{ email: string }>;

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { email } = await params; 
    console.log("user:", email);

    const result = await prisma.budget.findFirst({
        where: {
            createdBy: email,
        },
    });

    console.log(result);
    return NextResponse.json(result);
}
