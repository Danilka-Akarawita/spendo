import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;

  const deleted = await prisma.budget.delete({
    where: {
      id:  parseInt(id, 10),
    },
  });

  if (!deleted) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({});
}
