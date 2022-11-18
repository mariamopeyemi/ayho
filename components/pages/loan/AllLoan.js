import React from 'react';
import { useRouter } from "next/router";
import InvestmentCard from '../../cards/InvestmentCard';

const AllLoan = () => {
    const router = useRouter();
    function view(){
        router.push('/cooperative/loan/view-personal')
    }
  return (
    <div className='flex flex-wrap gap-[1rem]'>
        <InvestmentCard 
          text='Pending' status='warn' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Pending' status='warn' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Declined' status='error' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Declined' status='error' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Approved' status='success' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Approved' status='success' 
          onClick={view} 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Pending'
           status='warn' 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Pending'
           status='warn' 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
        <InvestmentCard 
          text='Pending'
           status='warn' 
          ltContent='Amount Request' 
          lbContent='N300,000' 
          rtContent='Date Needed' 
          rbContent='23/05/2022'/>
    </div>
  )
}

export default AllLoan;