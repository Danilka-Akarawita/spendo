import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  amount: z.number().positive(),
});

type UpdatedBudgetData = z.infer<typeof schema>;
type Params = Promise<{ id: string }>;

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  // Parse and validate the request body
  const { id } = await params;
  const body: UpdatedBudgetData = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const budget = await prisma.budget.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!budget) {
    return NextResponse.json(
      {
        error: "Budget not found",
      },
      {
        status: 404,
      }
    );
  }
  console.log("Budget found:", budget);

  const updatedBudget = await prisma.budget.update({
    where: { id: budget.id },
    data: {
      name: body.name,
      amount: body.amount,
    },
  });

  return NextResponse.json(updatedBudget, { status: 201 });
}
