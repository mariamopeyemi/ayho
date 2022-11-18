import React, { useState } from "react";
import ViewTop from '../../../../components/layouts/ViewTop';
import AppLayout from '../../../../components/layouts/AppLayout';
import ManagerSwitcher from '../../../../components/ManagerSwitcher';
import AllTransaction from '../../../../components/tables/savings/goal/AllTransactions';
import PendingTransaction from "../../../../components/tables/savings/goal/PendingTransaction";
import FailedTransaction from "../../../../components/tables/savings/goal/FailedTransaction";
import SuccessTransaction from "../../../../components/tables/savings/goal/SuccessfulTransaction";
import { LoadingButton } from "@mui/lab";
import LabelTag from "../../../../components/buttons/LabelTag";



const SAVINGS = [
    {title:"All (2000)", id:"ALL_SAVINGS"},
    {title:"Pending (400)", id:"PENDING_SAVINGS"},
    {title:"Failed (200)", id:"FAILED_SAVINGS"},
    {title:"Successful (1400)", id:"SUCCESS_SAVINGS"},
    
  ]
const ViewIndividualDetails = () => {
    
  const [activeTable, setActiveTable] = useState("ALL_INVESTMENTS");

  return (
    <AppLayout>
    <div className='flex flex-col my-[2rem]  '>
        <ViewTop withBack='true' user='Winner Okpere' withRed='true' greenBtnTitle='Pay' redBtnTitle='Remove'  />
        
       <div className="mt-[4rem]">
       <ManagerSwitcher
          handleChange={(item) => {
            setActiveTable(item);
          }}
          items={SAVINGS}
        ></ManagerSwitcher>
       </div>

        <div>
          {activeTable === "ALL_SAVINGS" && <AllTransaction />}
          {activeTable === "PENDING_SAVINGS" && <PendingTransaction />}
          {activeTable === "FAILED_SAVINGS" && <FailedTransaction />}
          {activeTable === "SUCCESS_SAVINGS" && <SuccessTransaction />}
        
        </div>

        <div className="p-[2rem] bg-white rounded-xl flex flex-row justify-between my-[2rem]">
          <div className="flex flex-row gap-[2rem] " >
          <p>Payment Status:</p>
          <LabelTag text='Failed' status='error'></LabelTag></div> 
          <div className='w-[200px]'>
        <LoadingButton
            onClick
            variant="contained"
          >
            Send Reminder 
          </LoadingButton>
        </div>
        </div>
    </div>
    </AppLayout>
  )
}

export default ViewIndividualDetails