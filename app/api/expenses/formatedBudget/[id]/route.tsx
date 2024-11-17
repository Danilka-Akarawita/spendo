import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  console.log("Fetching budgets for id:", id);

  try {
    const budgets = await prisma.budget.findMany({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        expenses: true,
      },
    });

    const transformedBudgets = budgets.map((budget) => {
      const totalSpent = budget.expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      const remaining = budget.amount - totalSpent;

      return {
        id: budget.id,
        name: budget.name,
        amount: budget.amount,
        totalSpent,
        remaining,
        expensesCount: budget.expenses.length,
        createdAt: budget.createdAt,
      };
    });

    return NextResponse.json(transformedBudgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const schema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  budgetId: z.string(),
});

type ExpenseData = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  // Parse and validate the request body
  const body: ExpenseData = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const expense = await prisma.expenses.create({
    data: {
      name: validation.data.name,
      amount: validation.data.amount,
      budgetId: parseInt(validation.data.budgetId, 10),
    },
  });

  return NextResponse.json(expense, { status: 201 });
}

