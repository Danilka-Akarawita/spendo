"use client";
import React, { useState } from "react";
import CreateBudget from "./CreateBudget";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function BudgetList() {
  const [name, setName] = useState<string | undefined>();
  const [Amount, setAmount] = useState<string | undefined>();

  const { user } = useUser();

  const onCreateBudget = async () => {
  
    const sampleBudget = {
      name: name,
      amount: Amount ? parseFloat(Amount) : undefined,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    };
    

    const response = await fetch('/api/budget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleBudget),
    });

    if (!response.ok) {
      throw new Error("Failed to create budget");
    }

    toast('New Budget Created!')
    
  };

  return (
    <div className="mt-7">
      <Dialog>
        <DialogTrigger asChild>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <CreateBudget />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-6">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Name</h2>
                </div>

                <Input
                  placeholder="e.g.Home Decor"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="mt-2">
                  <h2 className="text-black font-medium my-2">Budget Amount</h2>
                </div>

                <Input
                  type="number"
                  placeholder="e.g.5000$"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button
                disabled={!(name && Amount)}
                className="mt-5 w-full"
                onClick={()=>onCreateBudget()}
              >
                Create Budget
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BudgetList;
