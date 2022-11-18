//  <>
//    {activeTable === "ALL_INVESTMENTS" && <AllInvestment />}
//    {activeTable === "PENDING_INVESTMENTS" && <PendingInvestment />}
//    {activeTable === "APPROVED_INVESTMENTS" && <ApprovedInvestment />}
//    {activeTable === "DECLINED_INVESTMENTS" && <DeclinedInvestment />}
        
//  </>


import Image from 'next/image';
// import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
// import ManagerSwitcher from "../../../../ManagerSwitcher";
import ManagerSwitcher from "../../../components/ManagerSwitcher";
import InvestmentCard from '../../../components/cards/InvestmentCard';
import AppLayout from "../../../components/layouts/AppLayout";
import {displayAllInvestment, displayAllCoopInvestment} from "../../../services/cooperative-admin.js";

const INVESTMENTS = [
  {title:"All (2000)", id:"ALL_INVESTMENTS"},
  {title:"Pending (400)", id:"PENDING_INVESTMENTS"},
  {title:"Approved (200)", id:"APPROVED_INVESTMENTS"},
  {title:"Declined (1400)", id:"DECLINED_INVESTMENTS"},
  
]
const Investments = () => {
    
    const router = useRouter();
    const [emptyInvest, setEmptyInvest] =useState(true);
    const [filterAll,       setFilterAll] =useState([]);
    const [filterPending, setFilterPending] =useState([]);
    const [filterApproved, setFilterApproved] =useState([]);
    const [filterDeclined, setFilterDeclined] =useState([]);
    const [activeTable, setActiveTable] = useState("ALL_INVESTMENTS");

      useEffect (() =>  {
        const handlePageLoad = async () => {
        try {
         const myData= await displayAllCoopInvestment();
         const testData= myData?.data;
            if (testData.length >= 1) {
              setEmptyInvest(false);
            } else {
              setEmptyInvest(true);
            }
         const personalData= myData.data.data;
         const newData= personalData.filter(obj => {
            return obj.loanType === 'personal';
          });

        //  all investment
          setFilterAll(newData);
        // pending investments
          const pending = newData.filter(obj => {
            return obj.coopApprovalStatus === 'pending';
          }); console.log(pending);

        // pending investments
          const approvedLoan = newData.filter(obj => {
            return obj.coopApprovalStatus === 'approved';
          });console.log(approvedLoan);
          
        // decline investments
          const declinedLoan = newData.filter(obj => {
            return obj.coopApprovalStatus === 'declined';
          });console.log(declinedLoan);
          
          setFilterPending(pending);
          setFilterApproved(approvedLoan);
          setFilterDeclined(declinedLoan);

        } catch (error) {
            // toast.error(myData?.message, { duration: 10000 });
        }
        }
      handlePageLoad()
      }, []);
      
      function view(id){
        router.push({
          pathname: '/cooperative/loan/view-personal',
          query: { id},
        })
      }
  return (

    <AppLayout>
    <ManagerSwitcher
            handleChange={(item) => {
            setActiveTable(item);
            }}
            className='ml-[2rem]'
            items={INVESTMENTS}
        ></ManagerSwitcher>
    
    {emptyInvest ?
    <div className="mt-[15%] flex flex-col justify-center content-center ">
        <div className="items-center  mx-[auto]"><Image src='/images/empty2.png' alt='empty' width='150px' height='150px' /></div>
        <p className="items-center  mx-[auto]">No Investment plan</p>
      </div> : 
      <div className='flex flex-wrap gap-[1rem]'>
        {activeTable === "ALL_INVESTMENTS" && <>
            {filterAll?.map((item, index) => {
            return (
            <InvestmentCard
                key={index}
                rtContent='Date Needed' 
                text={item.coopApprovalStatus} status='warn'
                ltContent='Amount Request'
                userName={item.companyName}
                onClick={()=>view(item.id)} 
                lbContent={item.loanAmount}
                rbContent={item.dateNeeded}
                businessDesc={item.businessDesc}
                />
            );})}
        </>}
        {activeTable === "PENDING_INVESTMENTS" && <>
            {filterPending?.map((item, index) => {
            return (
            <InvestmentCard
                key={index}
                rtContent='Date Needed' 
                text={item.coopApprovalStatus} status='warn'
                ltContent='Amount Request'
                userName={item.companyName}
                onClick={()=>view(item.id)} 
                lbContent={item.loanAmount}
                rbContent={item.dateNeeded}
                businessDesc={item.businessDesc}
                />
            );})}
        </>}
        {activeTable === "APPROVED_INVESTMENTS"  && <>
            {filterApproved?.map((item, index) => {
            return (
            <InvestmentCard
                key={index}
                rtContent='Date Needed' 
                text={item.coopApprovalStatus} status='warn'
                ltContent='Amount Request'
                userName={item.companyName}
                onClick={()=>view(item.id)} 
                lbContent={item.loanAmount}
                rbContent={item.dateNeeded}
                businessDesc={item.businessDesc}
                />
            );})}
        </>}
        {activeTable === "DECLINED_INVESTMENTS" && <>
            {filterDeclined?.map((item, index) => {
            return (
            <InvestmentCard
                key={index}
                rtContent='Date Needed' 
                text={item.coopApprovalStatus} status='warn'
                ltContent='Amount Request'
                userName={item.companyName}
                onClick={()=>view(item.id)} 
                lbContent={item.loanAmount}
                rbContent={item.dateNeeded}
                businessDesc={item.businessDesc}
                />
            );})}
        </>}
      
      </div>
      }
     </AppLayout>
  )
}

export default Investments;
