import { Button } from "@/components/ui/Button";
import { PenBox } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

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
  budgetInfo: Budget;
  refreshData: () => void;
}

function EditBudget({ budgetInfo,refreshData }: BudgetDataProp) {
  const [name, setName] = useState(budgetInfo?.name);
  const [Amount, setAmount] = useState(String(budgetInfo?.amount));
  const { user } = useUser();

  const onUpdateBudget = async () => {
    const updatedBudget = {
      name: name,
      amount: Amount ? parseFloat(Amount) : undefined,
    };
    const response = await fetch(`/api/budget/updateBudget/${budgetInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBudget),
    });

    if (!response.ok) {
      toast.error("Failed to update the budget");
      throw new Error("Failed to update the budget");
    }
    refreshData()
    const data = await response.json();
    toast.success("Budget updated successfully!");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-6">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Name</h2>
                </div>

                <Input
                  placeholder="e.g.Home Decor"
                  defaultValue={budgetInfo.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Amount</h2>
                </div>

                <Input
                  type="number"
                  placeholder="e.g.5000$"
                  defaultValue={budgetInfo.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && Amount)}
                className="mt-5 w-full"
                onClick={() => onUpdateBudget()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
