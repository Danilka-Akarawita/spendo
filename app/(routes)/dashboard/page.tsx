"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import ChartsDashboard from './_components/ChartsDashboard';

function Dashboard() {
  const {user}=useUser();
  const [budgetLists, setBudgetLists] = useState([]);

  const fetchBudgetList = async () => {
    const response = await fetch(
      `/api/budget`
    );
    const data = await response.json();
    setBudgetLists(data);
    console.log(data)
  };
  
  useEffect(() => {
    if (user){
      fetchBudgetList();
    }
  }, [user])

  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money </p>
      <CardInfo budgetInfo={budgetLists}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6'>
        <div className='md:col-span-2'>
          <ChartsDashboard budgetInfo={budgetLists}/>
        </div>
        <div>
          other content 
        </div>
      </div>
    </div>
  )
}

export default Dashboard