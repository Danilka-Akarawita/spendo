"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import CardInfo from './_components/CardInfo';

function Dashboard() {
  const {user}=useUser();
  return (
    <div className='p-5'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money </p>
      <CardInfo/>
    </div>
  )
}

export default Dashboard