import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const Header: React.FC = () => {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm' >
      <Image 
        src={'/logo.svg'} 
        alt='logo'
        width={50} 
        height={30} 
      />
      <Button variant="default">Get Started</Button>
    </div>
  )
}

export default Header
