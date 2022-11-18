import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";
import AppLayout from '../../../components/layouts/AppLayout';
import SuccessModal from '../../../components/modal/SuccessModal';
import DeclineModal from '../../../components/modal/investment/DeclineModal';
import LoanDetails from '../../../components/pages/loan/LoanDetails';
import CreditScore from '../../../components/pages/loan/CreditScore';
import {displaySingleLoan} from '../../../services/cooperative-admin.js';

const  ViewPersonalLoan = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inputValue, setInputValue] =useState([]);
  const [decline, setDecline] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  useEffect (() =>  {
    const handleSubmit = async (id) => {
    try {
      const myData= await displaySingleLoan(id)
      const newData= myData?.data;
      console.log(newData)
      setInputValue(newData)
      
      } catch (error) {
        // toast.error(data?.message, { duration: 10000 });
      }
      }
      if(id){
        console.log(id)
        handleSubmit(id)
      }
      }, [id])
  
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

        <div className='flex flex-row text-center gap-[2rem] items-center w-[40%]'>
            <Image src='/images/go-back.svg' width='11px' height='17px' alt='back arrow' onClick={() => {
               router.back();
             }} />
        </div>
        <LoanDetails 
        personal='true' 
        unColoredBtnClick={setDecline}
        coloredBtnClick={setTransferSuccess}   />
        <CreditScore />
    </AppLayout>
  )
}

export default  ViewPersonalLoan;