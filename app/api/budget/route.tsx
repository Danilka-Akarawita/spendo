import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
    name: z.string(),
    amount: z.number().positive(),
    createdBy:z.string().email()
});

type BudgetData = z.infer<typeof schema>; 


export async function POST(request: NextRequest) {
   
    // Parse and validate the request body
    const body: BudgetData = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

   
    const budget = await prisma.budget.create({
        data:{
            name: validation.data.name,
            amount: validation.data.amount,
            createdBy:validation.data.createdBy,
            
        },
    });

    return NextResponse.json(budget, { status: 201 });
}
