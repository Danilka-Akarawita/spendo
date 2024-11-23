"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  const { user } = useUser();
  const [budgetLists, setBudgetLists] = useState([]);
  useEffect(() => {
    if (user) {
      const fetchBudgetList = async () => {
        const response = await fetch(
          `/api/budget`
        );
        const data = await response.json();
        setBudgetLists(data);
        console.log(data)
      };

      fetchBudgetList();
    }
  }, [user]);
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget/>
        {budgetLists.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
