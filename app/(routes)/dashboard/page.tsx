"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';

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
  })

  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money </p>
      <CardInfo budgetInfo={budgetLists}/>
    </div>
  )
}

export default Dashboard