import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  console.log("Fetching expenses for id:", id);

  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        budgetId: parseInt(id, 10),
      },
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
