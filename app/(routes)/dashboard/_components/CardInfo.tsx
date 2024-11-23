import { PiggyBank } from 'lucide-react';
import React from 'react'

export type Budget = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
};
interface BudgetDataProp {
  budgetInfo: Budget[];

}

function CardInfo({budgetInfo}:BudgetDataProp) {
  return (
    <div className='mt-7'>
      <div className='p- border rounded-lg flex justify-between'>
        <div>
          <h2 className='text-sm'>Total Budget</h2>
          <h2 className='font-bold text-2xl'>$1500</h2>
      </div>
      <PiggyBank className='bg-primary p-3 h-12 w-17 rounded-lg text-white'/>
    </div>
    </div>
  )
}

export default CardInfo