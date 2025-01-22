"use server"
import { Suspense, use, useEffect } from 'react';
import db from "@/db/index"
import App from '@/components/App';
import { getServerSession } from 'next-auth';
import { redirect,useRouter } from 'next/navigation';
import { authOptions } from '../authstore/auth';
import { MessageDisplay } from '@/components/message';

export default async function DashboardPage() {
  const session= await getServerSession(authOptions);
  if(session){
    const userId = session?.user?.id!!; 
  const user = await db.users.findUnique({
    where: { id: userId },
    include: {
      watchlists: {
        include: {
          stocks: {
            include: {
              stocks: true
            }
          }
        }
      },
      portfolio: {
        include: {
          stocks: {
            include: {
              stock: true
            }
          }
        }
      }
    }
  });
  //console.log(user)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App initialData={user} />
    </Suspense>
  );
  }else{
    console.log("Here")
    const message="You must be logged in to access this page "
    return(
      <MessageDisplay message={message}/>
    )
}
}
