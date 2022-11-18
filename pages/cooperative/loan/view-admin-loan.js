import React, {useState} from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";
import AppLayout from '../../../components/layouts/AppLayout';
import SuccessModal from '../../../components/modal/SuccessModal';
import DeclineModal from '../../../components/modal/investment/DeclineModal';
import LoanDetails from '../../../components/pages/loan/LoanDetails';
import CreditScore from '../../../components/pages/loan/CreditScore';

const  ViewPersonalLoan = () => {
    const router = useRouter();
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

        <div className='flex flex-row text-center gap-[2rem] items-center w-[40%]'>
            <Image src='/images/go-back.svg' width='11px' height='17px' alt='back arrow' onClick={() => {
               router.back();
             }} />
        </div>
        <LoanDetails personal='true' coloredBtnClick={setTransferSuccess} unColoredBtnClick={setDecline}  />
        <CreditScore />
    </AppLayout>
  )
}

export default  ViewPersonalLoan;