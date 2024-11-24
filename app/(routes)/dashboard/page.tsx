"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import ChartsDashboard from "./_components/ChartsDashboard";
import BudgetItem from "./budgets/_component/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();
  const [budgetLists, setBudgetLists] = useState([]);
  const [ExpensesLists, setExpensesLists] = useState([]);

  const fetchBudgetList = async () => {
    const response = await fetch(`/api/budget`);
    const data = await response.json();
    setBudgetLists(data);
    console.log(data);
  };

  const fetchAllExpensesList = async () => {
    const response = await fetch(`/api/expenses`);
    const data = await response.json();
    setExpensesLists(data);
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      fetchBudgetList();
      fetchAllExpensesList()
    }
  }, [user]);

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">Here's what happening with your money </p>
      <CardInfo budgetInfo={budgetLists} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <ChartsDashboard budgetInfo={budgetLists} refreshData={fetchBudgetList} />
          <ExpenseListTable expenseListData={ExpensesLists} refreshData={fetchAllExpensesList}/>
        </div>
        <div className="grid gap-5">
        <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgetLists.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
