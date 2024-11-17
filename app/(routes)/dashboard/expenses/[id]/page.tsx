"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_component/BudgetItem";
import AddExpense from "../_components/AddExpense";

interface Params {
  params: {
    id: string;
  };
}

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
function Expenses({ params }: Params) {
  const [id, setId] = useState<string | "">("");
  const [budgetInfo, setBudgetInfo] = useState<Budget | ''>('');
  const { user } = useUser();

  // Unwrap params asynchronously
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchudgetInfo = async () => {
        const response = await fetch(`/api/expenses/${id}`);
        const data = await response.json();
        setBudgetInfo(data[0]);
        console.log(data);
      };

      fetchudgetInfo();
    }
  }, [id]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Expense ID</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
      {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div> 
        )}
        <AddExpense budgetId={id}/>
      </div>
    </div>
  );
}

export default Expenses;
