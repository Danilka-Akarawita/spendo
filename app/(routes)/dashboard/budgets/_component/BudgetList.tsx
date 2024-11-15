"use client";
import React, { useEffect } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";

function BudgetList() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchBudgetList = async () => {
        const response = await fetch(
          `/api/budget/${user.primaryEmailAddress?.emailAddress}`
        );
        const data = await response.json();
        console.log(data);
      };

      fetchBudgetList();
    }
  }, [user]);
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget />
      </div>
    </div>
  );
}

export default BudgetList;
