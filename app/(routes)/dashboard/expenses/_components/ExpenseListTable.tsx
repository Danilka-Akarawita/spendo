import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export type ExpenseData = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
};
interface ExpenseDataProps {
  expenseListData: ExpenseData[];
  refreshData: () => void;
}

function ExpenseListTable({ expenseListData, refreshData }: ExpenseDataProps) {
  const deleteExpense = async (expenseId: number) => {
    const response = await fetch(`/api/expenses/delete/${expenseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete  expense");
    }
    refreshData();
    toast("expense Deleted!");
  };
  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseListData.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>
                {new Date(expense.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Trash
                  className="text-red-600 cursor-pointer"
                  onClick={() => deleteExpense(expense.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExpenseListTable;
