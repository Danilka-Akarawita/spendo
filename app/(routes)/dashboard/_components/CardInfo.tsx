import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

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

function CardInfo({ budgetInfo }: BudgetDataProp) {
  const [totalBudget, setTotalBudget] = useState<number>();
  const [totalSpent, setTotalSpent] = useState<number>();

  useEffect(() => {
    if (budgetInfo?.length > 0) {
      calculateCardInfo();
    }
  }, [budgetInfo]);

  const calculateCardInfo = () => {
    let totalBudget = 0;
    let totalSpent = 0;
    budgetInfo.forEach((element) => {
      totalBudget += Number(element.amount);
      totalSpent += Number(element.totalSpent);
    });
    setTotalBudget(totalBudget);
    setTotalSpent(totalSpent);
  };

  return (
    <div>
      {budgetInfo?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>

          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpent}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>

          <div className="p-7 border rounded-lg flex justify-between">
            <div>
              <h2 className="text-sm">No of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetInfo.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
