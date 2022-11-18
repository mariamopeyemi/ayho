import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from 'next/image';
import AppLayout from "../../../components/layouts/AppLayout";
import ManagerSwitcher from "../../../components/ManagerSwitcher";
import AllTransaction from "../../../components/tables/wallet/AllTransactions";
import PendingTransaction from "../../../components/tables/wallet/PendingTransaction";
import SuccessTransaction from "../../../components/tables/wallet/SuccessfulTran";
import FailedTransaction from "../../../components/tables/wallet/FailedTransaction";
import { Button, Dialog, Stack } from "@mui/material";
import WithDrawModal from "../../../components/modal/wallet/WithDrawModal";
import SuccessModal from "../../../components/modal/SuccessModal";


const WALLETS = [
  {title:"All (2000)", id:"ALL_WALLETS"},
  {title:"Pending (400)", id:"PENDING_WALLETS"},
  {title:"Successful (1400)", id:"SUCCESS_WALLETS"},
  {title:"Failed (200)", id:"FAILED_WALLETS"},
  
]
const Wallet = () => {
  const router = useRouter();
  const [activeTable, setActiveTable] = useState("ALL_WALLETS");
  const [verifyTransfer, setverifyTransfer] = useState(true);
  const [transferVerify, setTransferVerify] = useState(false);
  const [withDraw, setWithDraw] = useState(false);
  const [WithdrawSuccess, setWithdrawSuccess] = useState(false);
  const [emptyTransaction, setEmptyTransaction] =useState(true)
  const [loading, setLoading] = useState(false);

  function viewSucess(){
    setWithDraw(false)
    setWithdrawSuccess(true)
  }
  function toggleVerifyClose(){
    setTransferVerify(!transferVerify)
  }
  function toggleVerify(){
    setverifyTransfer(false)
    setTransferVerify(!transferVerify)
  }
  return (
    <AppLayout>
        {/* <Dialog onClose={toggleVerifyClose} open={toggleVerify}> */}
       { verifyTransfer && <div className=" md:my-[8rem] m-[auto] px-[2rem] pt-[2rem] pb-[3rem] bg-white rounded-[8px] md:w-[520px] w-full ">
            
            <Stack gap={"12px"} className='px-[3rem] items-center flex flex-col'>
                <p className="text-black flex text-center">Enter your transaction Pin</p>
                <Image src='/auth/lock-key.svg' alt='lock' width='150px' height='200px' />
                <div></div>
                <div className='w-[50%]'>
                <LoadingButton
                    onClick={toggleVerify}
                    variant="contained"
                >
                    Verify
                </LoadingButton>
                </div>
            </Stack>
        </div>}
        {/* </Dialog> */}
       {/* { transferVerify && <TransactionVerifyModal
        toggle={()=>setTransferVerify(false)}
        open={()=>setTransferVerify(true)} />} */}
       { transferVerify && <>

       { withDraw && <WithDrawModal
        toggle={()=>setWithDraw(false)}
        open={()=>setWithDraw(true)}
        onClick={viewSucess} />}

       { WithdrawSuccess && <SuccessModal
        msg='N300,000 was successfully transferred to your bank.' 
        btnText='Ok'
        toggle={()=>setWithdrawSuccess(false)}
        open={()=>setWithdrawSuccess(true)} />}

      {/* <div className="flex flex-col"> */}
      
        <div style={{ background: "linear-gradient(263.28deg, #2A9D8F 1.44%, #2A9D8F 1.45%, #41C768 100%)" }} className={`w-[450px] my-[2rem] h-[127px] p-[2.2rem] px-[2.2rem] rounded-xl relative overflow-hidden flex flex-col justify-center min-w-[24rem]`}>
          <h2 className="mb-[1.6rem] leading-[19.4px] font-medium text-[1.5rem] text-white mt-2">E-wallet Balance</h2>
          <p className=" font-medium text-[2.8rem] leading-[38px] text-white">N300,000</p>

          <div className=" absolute top-0 right-0 h-full">

            <img className="h-[8rem] w-auto scale-[1.4] absolute -left-[1.7rem] top-0" src="/images/card-path.png" alt='image'></img>

            <div style={{ background: "rgba(255, 255, 255, 0.3)", borderRadius: "40px 8px 8px 40px" }} className="w-[20.5rem] rounded-xl h-full flex justify-center">
                <Button
                onClick={setWithDraw}
                className="w-[140px] bg-white text-[#137C4B] hover:text-white hover:bg-[#137C4B]   my-[auto]"
                >Withdraw</Button>
            </div>
          </div>
        </div>
        <ManagerSwitcher
        handleChange={(item) => {
          setActiveTable(item);
        }}
        items={WALLETS}
      ></ManagerSwitcher>

     {emptyTransaction ?
     <div className="mt-[15%] flex flex-col justify-center content-center ">
        <div className="items-center  mx-[auto]"><Image onClick={()=>setEmptyTransaction(!emptyTransaction)} src='/images/empty3.svg' alt='empty' width='100px' height='100px' /></div>
        <p className="items-center  mx-[auto]">No Transaction History</p>
      </div> : 
      <>
        {activeTable === "ALL_WALLETS" && <AllTransaction />}
        {activeTable === "PENDING_WALLETS" && <PendingTransaction />}
        {activeTable === "SUCCESS_WALLETS" && <SuccessTransaction />}
        {activeTable === "FAILED_WALLETS" && <FailedTransaction />}
      </>
      }
     </>}
    </AppLayout>
  );
};

export default Wallet;
