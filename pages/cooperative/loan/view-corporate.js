import React, {useState} from 'react';
import Image from 'next/image';
import Header from '../../../components/layouts/Header';
import AppLayout from '../../../components/layouts/AppLayout';
import SuccessModal from '../../../components/modal/SuccessModal';
import DeclineModal from '../../../components/modal/investment/DeclineModal';
import LoanDetails from '../../../components/pages/loan/LoanDetails';
import CreditScore from '../../../components/pages/loan/CreditScore';

const ViewCorporateLoan = () => {
  const [decline, setDecline] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  
  
  return (
    <AppLayout>
        {/* { Decline Modal */}
        { decline && <DeclineModal
        toggle={()=>setDecline(false)}
        open={()=>setDecline(true)} />}


        {/* {Transfer to wallet SUCCESS modal} */}
        { transferSuccess && <SuccessModal
        msg='Alhiyu Samabara will be notified on the approval.'
        btnText='Ok'
        toggle={()=>setTransferSuccess(false)}
        open={()=>setTransferSuccess(true)} />}

         
        <Header  withBack='true' withRed='true' 
            unColoredBtnTitle='Decline' coloredBtnTitle='Approve' 
            coloredBtnClick={setTransferSuccess} unColoredBtnClick={setDecline} 
            />
        <LoanDetails corporate='true'  />
        < CreditScore />
        <div className='bg-white p-[3rem] rounded-xl flex flex-col my-[3rem] !min-h-[40rem]'>
            <p className='text-[24px] text-[#666668]'>Document</p>
            <hr className=' border-solid border-[#EBEBEB] my-[2rem] ' />
            <div className='flex flex-row gap-[2rem] bg-white p-[3rem] rounded-xl my-[3rem]'>
                <div className='w-[320px] bg-[#F0F2F5] rounded-xl h-[20rem] flex flex-col  justify-center items-center'>
                    <Image src='/images/doc.svg' alt='me' width='25px' height='25px' className='cursor-pointer ' />
                    <p className='mt-[2rem] text-[#9999B4] '>Pitch Deck</p>
                </div>
                <div className='w-[320px] bg-[#F0F2F5] rounded-xl h-[20rem] flex flex-col  justify-center items-center'>
                    <Image src='/images/doc.svg' alt='me' width='25px' height='25px' className='cursor-pointer ' />
                    <p className='mt-[2rem] text-[#9999B4] '>CAC</p>
                </div>
                
            </div>
            
        </div>
    </AppLayout>
  )
}

export default ViewCorporateLoan;