"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_component/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";

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


function Expenses({ params }: Params) {
  const [id, setId] = useState<string | "">("");
  const [budgetInfo, setBudgetInfo] = useState<Budget | "">("");
  const [ExpenseList, setExpenseList] = useState([]);

  const { user } = useUser();

  // Unwrap params asynchronously
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);
  const fetchBudgetInfo = async () => {
    const response = await fetch(`/api/expenses/formatedBudget/${id}`);
    const data = await response.json();
    setBudgetInfo(data[0]);
    console.log(data);
  };
  const fetchExpensesInfo = async () => {
    const response = await fetch(`/api/expenses/${id}`);
    const data = await response.json();
    setExpenseList(data);
    console.log("Expenses ", data);
  };
  useEffect(() => {
    if (id) {
      fetchBudgetInfo();
      fetchExpensesInfo();
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
        <AddExpense budgetId={id} refreshData={fetchBudgetInfo} />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable expenseListData={ExpenseList} />

      </div>
    </div>
  );
}

export default Expenses;
