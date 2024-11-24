import React from "react";
import BudgetList from "./_component/BudgetList";

function Budgets() {
  return (
    <div className="mt-6 ml-3">
      <h2 className="font-bold text-2xl">My Budgets</h2>
      <BudgetList />
    </div>
  );
}

export default Budgets;
