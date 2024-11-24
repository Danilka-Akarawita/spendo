"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_component/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/Button";
import { Pen, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

export type Budget = {
  id: number;
  name: string;
  amount: number;
  totalSpent: number;
  remaining: number;
  expensesCount: number;
  createdAt: Date;
};


interface Params {
  id: string;
}

function Expenses({ params }: { params: Params }) {
  const [id, setId] = useState<string>("");
  const [budgetInfo, setBudgetInfo] = useState<Budget | null>(null);
  const [ExpenseList, setExpenseList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    
    setId(params.id);
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

  const refreshData = async () => {
    await fetchBudgetInfo();
    await fetchExpensesInfo();
  };

  useEffect(() => {
    if (id) {
      fetchBudgetInfo();
      fetchExpensesInfo();
    }
  }, [id]);

  const deleteBudget = async () => {
    const response = await fetch(`/api/budget/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }

    toast("Budget Deleted!");
    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <span>
          <div className="flex gap-2 items-center">
            {budgetInfo && (
              <EditBudget
                budgetInfo={budgetInfo}
                refreshData={fetchBudgetInfo}
              />
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex gap-2" variant="destructive">
                  <Trash />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your budget and the data
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteBudget}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense budgetId={id} refreshData={refreshData} />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseListData={ExpenseList}
          refreshData={refreshData}
        />
      </div>
    </div>
  );
}

export default Expenses;
