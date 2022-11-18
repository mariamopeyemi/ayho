import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import toast from "react-hot-toast";
import Header from '../../../components/layouts/Header';
import AppLayout from '../../../components/layouts/AppLayout';
import SuccessModal from '../../../components/modal/SuccessModal';
import { updateCoopMember} from '../../../services/cooperative-admin.js';
import MemberDetails from '../../../components/pages/member/MemberDetails';
import DeclineModal from '../../../components/modal/investment/DeclineModal';
import { useRouter } from 'next/router';

// import InvestmentDetails from '../../../components/pages/investment/InvestmentDetails';


const ViewMembers = () => {
    const router =useRouter();
    const {id} =router.query;
  const [decline, setDecline] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [memberData, setMemberData] =useState(
    {
    firstName:'',
    lastName:'',
    email:'',
    gender:'',
    state:'',
    address:'',
    phoneNumber:'',
    nokFirstName:'',
    nokLastName:'',
    nokEmail:'',
    nokPhone:'',
    nokLocation:'',
    nokRelationship:'',
}
);

useEffect (() =>  {
    
    const handleUpdateMember = async (id) => {
    try {
     const myData= await updateCoopMember(id);
    //  const newData= myData.data.data.users;
     const newData= myData.data;
     setMemberData(newData); 
    } catch (error) {
      toast.error("Error trying to update. Try again later" , { duration: 10000 });
    }}
    if(id){
    handleUpdateMember(id)
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

        <Header  withBack='true' withRed='true' 
            unColoredBtnTitle='Block' coloredBtnTitle='Save' 
            // coloredBtnClick={setDecline} unColoredBtnClick={setTransferSuccess} 
            />
          <MemberDetails 
            firstName={memberData?.firstName}
            lastName={memberData?.lastName}
            email={memberData?.email}
            gender={memberData?.gender}
            state={memberData?.state}
            address={memberData?.address}
            phoneNumber={memberData?.phoneNumber}
        />
        <div className='flex flex-row justify-between my-[3rem] '>
            
            <div className='w-[49%] gap-[2rem] bg-white p-[3rem] rounded-xl flex flex-col my-[3rem] !min-h-[40rem]'>
                <div className='bg-[#F0F2F5] rounded-xl h-[20rem] flex flex-row justify-center  '>
                    <Image src='/images/votercard.svg'  alt='Identity Card' width='265px' height='150px' />
                </div>
                <div className='bg-[#F0F2F5] rounded-xl h-[20rem] flex flex-row justify-center  '>
                    <Image src='/images/voterback.svg'  alt='Identity Card' width='265px' height='150px' />
                </div>
            </div>
            <div className='w-[49%] bg-white p-[3rem] rounded-xl flex flex-col my-[3rem] !min-h-[40rem]'>
                <p className='text-[24px] text-[#666668]'>Next of Kin</p>
                <hr className=' border-solid border-[#EBEBEB] my-[2rem] ' />
                <div className='flex flex-row justify-between '>
                    <div className='w-[50%] flex flex-col gap-[2rem] my-[1rem]'>
                        <p className='text-[#9999B4]  '>Fullname </p>
                        {/* <p className=' text-[#666668]'> David Okpere</p> */}
                        <p className=' text-[#666668]'> {memberData?.nokFirstName +' '+ memberData?.nokLastName}</p>
                    </div>
                    <div className='w-[50%] flex flex-col gap-[2rem] my-[1rem]'>
                        <p className='text-[#9999B4]  '>Phone  </p>
                        {/* <p className=' text-[#666668]'> 09034354343</p> */}
                        <p className=' text-[#666668]'> {memberData?.nokPhone}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between '>
                    <div className='w-[50%] flex flex-col gap-[2rem] my-[1rem]'>
                        <p className='text-[#9999B4]  '>Location </p>
                        {/* <p className=' text-[#666668]'> Abuja</p> */}
                        <p className=' text-[#666668]'> {memberData?.nokLocation}</p>
                    </div>
                    <div className='w-[50%] flex flex-col gap-[2rem] my-[1rem]'>
                        <p className='text-[#9999B4]  '>Email </p>
                        {/* <p className=' text-[#666668]'> davidokpere@gmail.com</p> */}
                        <p className=' text-[#666668]'> {memberData?.nokEmail}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[2rem] my-[1rem]'>
                    <p className='text-[#9999B4]  '>Relationship </p>
                    {/* <p className=' text-[#666668]'> Cousin</p> */}
                    <p className=' text-[#666668]'> {memberData?.nokRelationship} </p>
                </div>
                
            </div>
        </div>
    </AppLayout>
  )
}

export default ViewMembers;