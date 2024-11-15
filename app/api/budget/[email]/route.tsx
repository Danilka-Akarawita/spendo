import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ email: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { email } = await params;

  console.log("Fetching budgets for email:", email);

  try {
    const budgets = await prisma.budget.findMany({
      where: {
        createdBy: email,
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
