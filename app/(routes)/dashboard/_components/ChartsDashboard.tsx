import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
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

interface BudgetDataProp {
  budgetInfo: Budget[];
}

function ChartsDashboard({ budgetInfo }: BudgetDataProp) {
  return (
    <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Acivity</h2>
      <BarChart width={500} height={300} data={budgetInfo} margin={{top:8}}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
      </BarChart>
    </div>
  );
}

export default ChartsDashboard;
