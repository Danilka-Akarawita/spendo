import Link from "next/link";
import React from "react";

export type Budget = {
  id: number;
  name: string;
  amount: number;
  totalSpent: number;
  remaining: number;
  expensesCount: number;
  createdAt: Date;
};
interface BudgetItemProps {
  budget: Budget;
}

function BudgetItem({ budget }: BudgetItemProps) {
  return (
    <Link href={'/dashboard/expenses/'+budget.id} className="p-5 border rounded-lg hover:shadow-md cursor-pointer mr-1 h-[170px]">
      <div className="flex gap-2 items-center justify-between">
        <div className=" gap-2 items-center">
          <h2 className="font-bold">{budget.name}</h2>
          <h2 className="text-sm">{budget.expensesCount} items</h2>
        </div>
        <h2 className="font-bold text-primary text-lg">{budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">${budget.totalSpent?budget.totalSpent:0}spend</h2>
            <h2 className="text-xs text-slate-400">${budget.remaining?budget.remaining:0}remaining</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
            <div className="w-[40%] bg-primary h-2 rounded-full">

            </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
