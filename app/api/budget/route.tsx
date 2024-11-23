import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  console.log(user?.primaryEmailAddress?.emailAddress);

  try {
    const budgets = await prisma.budget.findMany({
      where: {
        createdBy: user?.primaryEmailAddress?.emailAddress,
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
  createdBy: z.string().email(),
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
    data: {
      name: validation.data.name,
      amount: validation.data.amount,
      createdBy: validation.data.createdBy,
    },
  });

  return NextResponse.json(budget, { status: 201 });
}
