import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique(
    {
      where: {
        userId: user.id,
      },
    }
  )
  if (!userSettings) {
    redirect("/wizard");
  }


  return (
    <div className='h-full bg-background'>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-6">
          <p className='text-3xl font-bold'></p>
          Hello, {user.firstName} 👋🏻
        </div>
      </div>
    </div>
  )
}

export default page