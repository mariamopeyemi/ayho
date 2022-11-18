import Image from 'next/image'; 
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React, {useState, useEffect} from 'react';
import Header from '../../../../components/layouts/Header';
import ErrorModal from '../../../../components/modal/ErrorModal';
import AppLayout from '../../../../components/layouts/AppLayout';
import SuccessModal from '../../../../components/modal/SuccessModal';
import SavingsCard from '../../../../components/pages/savings/SavingsCard';
import LogPaymentModal from '../../../../components/modal/saving/goal/LogPayment';
import AddMemberModal from '../../../../components/modal/saving/goal/AddMember';
import { displaySingleGoalSavings } from '../../../../services/cooperative-admin.js/index.js';
// import TransferWalletModal from '../../../../components/modal/saving/fixed/TransferWalletModal';
import PaymentTransaction from '../../../../components/tables/savings/goal/PaymentTransactions';


const ViewGoal = () => {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] =useState([]);
  const [startTopUp, setStartTopUp] = useState(false);
  const [startTransfer, setStartTransfer] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
     
  useEffect (() =>  {
    const handleSubmit = async (id) => {
    try {
      const myData= await displaySingleGoalSavings(id)
      const newData= myData?.data;
      console.log(newData)
      setInputValue(newData)
      } catch (error) {
        toast.error(data?.message, { duration: 10000 });
      }
      }
      if(id){
        console.log(id, 'i am the id')
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
  function viewDetails(){
    router.push('/cooperative/savings/self/view-details')
  }
  return (
    <AppLayout>

        {/* {Top Up Modal} */}
        { startTopUp && <LogPaymentModal
        toggle={()=>setStartTopUp(false)}
        open={()=>setStartTopUp(true)}
        onClick={myFunc2} />}

        {/* { Error Modal */}
        { error && <ErrorModal
        toggle={()=>setError(false)}
        open={()=>setError(true)} />}

        {/* {Add members} */}
        { startTransfer && <AddMemberModal
        toggle={()=>setStartTransfer(false)}
        open={()=>setStartTransfer(true)}
        onClick={myFunc}
        viewId={id}
        />}

        {/* {Transfer to wallet Modal} */}
        {/* { startTransfer && <TransferWalletModal
        toggle={()=>setStartTransfer(false)}
        open={()=>setStartTransfer(true)}
        onClick={myFunc} />} */}

        {/* {Transfer to wallet SUCCESS modal} */}
        { transferSuccess && <SuccessModal
        msg='N300,000 was successfully transferred to your wallet.'
        btnText='Check Wallet'
        toggle={()=>setTransferSuccess(false)}
        open={()=>setTransferSuccess(true)} />}

          {inputValue?.statusOfPlan === 'matured' ?
            <Header title='Company Title' withBack='true' coloredBtnTitle='Pay Members'
            coloredBtnClick={setStartTransfer} unColoredBtnClick={setStartTopUp} 
            />
            :  <Header title='company title' withBack='true' coloredBtnTitle='Add Members'
            coloredBtnClick={setStartTransfer} withTwoBtn unColoredBtnTitle="Log In Payment" unColoredBtnClick={setStartTopUp} 
            />}
       
       {/* formatDate */}
        <SavingsCard
          endDate={inputValue?.endDate}
          amountSaved='0'
          startDate={inputValue?.startDate}
          debitDate={inputValue?.debitDate}
          amountPaid={inputValue?.amount}
          statusOfPlan={inputValue?.statusOfPlan}
          targetAmount={inputValue?.targetAmount}
          interestEarned={inputValue?.interestEarned}
          interestPercent={inputValue?.interestPercent}
          frequencyOfSavings={inputValue?.frequencyOfSavings}
        />
        <div className='bg-white rounded-xl py-[3rem] px-[2rem]'>
        <div className=' rounded-lg flex flex-row p-[1rem] bg-[#F0F2F3]'>
                <Image src='/images/search.svg' alt='search' height='20px' width='20px' />
                <input
                    className=" bg-[#F0F2F3] ml-[2rem] w-full text-[14px] border-[#F0F2F3] border-solid focus:border-[#F0F2F3] placeholder:text-black rounded-2xl"
                    type='search'
                    placeholder='Search'
                ></input>
            </div>
        </div>
        <PaymentTransaction onClick={viewDetails} />
      
    </AppLayout>
  )
}

export default ViewGoal;
