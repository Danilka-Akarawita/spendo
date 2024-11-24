"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'


const Header: React.FC = () => {

  const {user,isSignedIn}=useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm' >
      <Image 
        src={'/logo.svg'} 
        alt='logo'
        width={50} 
        height={30} 
      />
      {isSignedIn?
      <UserButton/>:
      <Link href='/sign-in'>
      <Button variant="default">Get Started</Button>
      </Link>}
      
      
    </div>
  )
}

export default Header
