import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from 'next/image';
import AppLayout from "../../../components/layouts/AppLayout";
import { Button } from "@mui/material";
import NotificationCard from "../../../components/cards/NotificationCard";

const Index = () => {
  const router = useRouter();
  const [emptySavings, setEmptySavings] =useState(true)
  return (
    <AppLayout>

        {emptySavings ?
          <div className="mt-[15%] flex flex-col justify-center content-center ">
            <div className="items-center  mx-[auto]"><Image onClick={()=>setEmptySavings(!emptySavings)} src='/images/empty4.svg' alt='empty' width='150px' height='150px' /></div>
            <p className="items-center  mx-[auto]">No Transaction History</p>
          </div> : 
          <>
            <div className="flex flex-row w-[50%] gap-[2rem]">
              <Button variant="outlined" color="success">Mark all as read</Button>
              <Button variant="outlined" color="error">Delete</Button>
            </div>
            <div className="my-[2rem] gap-[2rem] flex flex-col">
              <NotificationCard 
                notificationtitle='Sam Oluwaseyi' 
                notificationbody='Sent you a loan request. ' 
                withBtn="true"
                span='View Details' 
                date='just now'
                onClick='/' />
              <NotificationCard 
                notificationtitle='Wallet Topup' 
                notificationbody='Your wallet has been top-up with N100,000 ' 
                date='31/05/2022'
                onClick='/' />
              <NotificationCard 
                notificationtitle='Winner Okpere' 
                notificationbody='Sent you an investment request. ' 
                withBtn="true"
                span='View Details' 
                date='24/05/2022'
                onClick='/' />
            </div>
          </>
          }
            
     
    </AppLayout>
  );
};

export default Index;