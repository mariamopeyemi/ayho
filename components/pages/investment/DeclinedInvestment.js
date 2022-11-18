import React from 'react';
import { useRouter } from "next/router";
import InvestmentCard from '../../cards/InvestmentCard';

const DeclinedInvestment = () => {
  const router = useRouter();
  function view(){
      router.push('/cooperative/investment/view')
  }
  return (
    <div className='flex flex-wrap gap-[1rem]'>
    <InvestmentCard text='Declined' status='error' onClick={view} />
    <InvestmentCard text='Declined' status='error' onClick={view} />
    <InvestmentCard text='Declined' status='error' onClick={view} />
    <InvestmentCard text='Declined' status='error' onClick={view} />
    <InvestmentCard text='Declined' status='error' onClick={view} />
    <InvestmentCard text='Declined' status='error' onClick={view} />
</div>
  )
}

export default DeclinedInvestment