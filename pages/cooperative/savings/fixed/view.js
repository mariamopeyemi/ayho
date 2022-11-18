import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';
import Header from '../../../../components/layouts/Header';
import ErrorModal from '../../../../components/modal/ErrorModal';
import AppLayout from '../../../../components/layouts/AppLayout';
import ManagerSwitcher from '../../../../components/ManagerSwitcher';
import SuccessModal from '../../../../components/modal/SuccessModal';
import TopUpModal from '../../../../components/modal/saving/fixed/TopUpModal';
import {displaySingleFixedSavings} from '../../../../services/cooperative-admin.js';
import FixedSavingsCard from "../../../../components/pages/savings/FixedSavingsCard";
import AllTransaction from '../../../../components/tables/savings/fixed/AllTransactions';
import SuccessTransaction from '../../../../components/tables/savings/fixed/SuccessfulTran';
import FailedTransaction from '../../../../components/tables/savings/fixed/FailedTransaction';
import PendingTransaction from '../../../../components/tables/savings/fixed/PendingTransaction';
import TransferWalletModal from '../../../../components/modal/saving/fixed/TransferWalletModal';


const FIXEDSAVINGS = [
  {title:"All (2000)", id:"ALL_SAVINGS"},
  {title:"Pending (400)", id:"PENDING_SAVINGS"},
  {title:"Successful (1400)", id:"SUCCESS_SAVINGS"},
  {title:"Failed (200)", id:"FAILED_SAVINGS"},
  
]

const ViewFixed = () => {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] =useState([]);
  const [startTopUp, setStartTopUp] = useState(false);
  const [startTransfer, setStartTransfer] = useState(false); 
  const [activeTable, setActiveTable] = useState("All (2000)");
  const [transferSuccess, setTransferSuccess] = useState(false);
  
  useEffect (() =>  {
    const handleSubmit = async (id) => {
    try {
      const myData= await displaySingleFixedSavings(id)
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
  function myFunc(){
    setStartTransfer(false)
    setTransferSuccess(true)
  }
  function myFunc2(){
    setStartTopUp(false)
    setError(true)
  }
  return (
    <AppLayout>

        
        {/* { startTopUp && <CreatePlanModal */}
        { startTopUp && <TopUpModal 
        toggle={()=>setStartTopUp(false)}
        open={()=>setStartTopUp(true)}
        onClick={myFunc2} />}

        {/* { Error Modal */}
        { error && <ErrorModal
        toggle={()=>setError(false)}
        open={()=>setError(true)} />}

        {/* {Transfer to wallet Modal} */}
        { startTransfer && <TransferWalletModal
        toggle={()=>setStartTransfer(false)}
        open={()=>setStartTransfer(true)}
        onClick={myFunc} />}

        {/* {Transfer to wallet SUCCESS modal} */}
        { transferSuccess && <SuccessModal
        msg='N300,000 was successfully transferred to your wallet.'
        btnText='Check Wallet'
        toggle={()=>setTransferSuccess(false)}
        open={()=>setTransferSuccess(true)} />}

        <Header title='Christmas Savings' withBack='true' withTwoBtn='true' 
            unColoredBtnTitle='Top-up' coloredBtnTitle='Transfer to Wallet'
            coloredBtnClick={setStartTransfer} unColoredBtnClick={setStartTopUp} 
            />
        <FixedSavingsCard 
          amountLocked={inputValue?.amount}
          startDate={inputValue?.startDate}
          endDate={inputValue?.endDate}
          statusOfPlan={inputValue?.statusOfPlan}
          amountTobeSaved={inputValue?.amountTobeSaved}
          interestEarned={inputValue?.interestEarned}
        />
        <ManagerSwitcher
        handleChange={(item) => {
          setActiveTable(item);
        }}
        items={FIXEDSAVINGS}
      ></ManagerSwitcher>
        {activeTable === "ALL_SAVINGS" && <AllTransaction />}
        {activeTable === "PENDING_SAVINGS" && <PendingTransaction />}
        {activeTable === "SUCCESS_SAVINGS" && <SuccessTransaction />}
        {activeTable === "FAILED_SAVINGS" && <FailedTransaction />}
    </AppLayout>
  )
}

export default ViewFixed;