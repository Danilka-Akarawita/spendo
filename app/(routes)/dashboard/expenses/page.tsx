"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";

function page() {
  const { user } = useUser();
  const [ExpensesLists, setExpensesLists] = useState([]);
  const fetchAllExpensesList = async () => {
    const response = await fetch(`/api/expenses`);
    const data = await response.json();
    setExpensesLists(data);
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      fetchAllExpensesList();
    }
  }, [user]);
  return (
    <div className="ml-5 mt-6 ">
        <h2 className="font-bold text-2xl ">My Expenses</h2>
      <ExpenseListTable
        expenseListData={ExpensesLists}
        refreshData={fetchAllExpensesList}
      />
    </div>
  );
}

export default page;
