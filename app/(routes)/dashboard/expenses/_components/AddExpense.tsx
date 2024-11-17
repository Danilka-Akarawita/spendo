import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";

function AddExpense() {
    const [name, setName] = useState<string | undefined>();
    const [Amount, setAmount] = useState<string | undefined>();
  return (
    <div className="border p-5 rounded-lg gap-2">
      <div className="ml-2">
        <div className="font-bold text-lg">AddExpense</div>

        <div className="mt-2">
          <h2 className="text-black font-medium my-2">Expense Name</h2>

          <Input
            placeholder="e.g.Bedroom"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <h2 className="text-black font-medium my-2">Expense Amount</h2>

          <Input
            type="number"
            placeholder="e.g.1000$"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button
                disabled={!(name && Amount)}
                className="mt-5 w-full"
                //onClick={() => onCreateBudget()}
              >
                Create Budget
              </Button>
      </div>
    </div>
  );
}

export default AddExpense;
