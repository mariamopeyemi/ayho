import { Button, } from '@mui/material';
import React from 'react';
import { useRouter } from "next/router";

const AccountRole = () => {
  const router = useRouter();
  function viewPage(){
    router.push("/cooperative/account/view-role");
  }

  return (
    <div className='flex flex-col gap-[2rem]'>
        <div className='p-[3rem] gap-[2rem] bg-white rounded-xl flex flex-col'>
          <div className='flex flex-row justify-between '  >
            <p className='text-[#666668]'>Role</p>
            <p className='text-[#1D1D1D]'>Admin</p>
          </div>
          <hr className='border border-solid border-gray-200' />
          <div className='flex flex-row justify-between'>
            <p className='text-[#666668]'>Permission</p>
            <p className='text-[#137C4B] cursor-pointer' onClick={viewPage} >View Details</p>
          </div>
          <hr className='border border-solid border-gray-200' />
          <div className='flex flex-row justify-between'>
            <p className='text-[#666668]'>Action</p>
            <p className='text-[#C31331] cursor-pointer'>Delete</p>
          </div>
        </div>
        <div className='p-[3rem] gap-[2rem] bg-white rounded-xl flex flex-col'>
          <div className='flex flex-row justify-between '  >
            <p className='text-[#666668]'>Role</p>
            <p className='text-[#1D1D1D]'>Admin</p>
          </div>
          <hr className='border border-solid border-gray-200' />
          <div className='flex flex-row justify-between'>
            <p className='text-[#666668]'>Permission</p>
            <p className='text-[#137C4B]'>View Details</p>
          </div>
          <hr className='border border-solid border-gray-200' />
          <div className='flex flex-row justify-between'>
            <p className='text-[#666668]'>Action</p>
            <p className='text-[#C31331]'>Delete</p>
          </div>
        </div>
        <div className='  mb-[2rem]'>
          <Button  className=' w-[150px]  hover:text-white text-[#137C4B]'>Add New</Button>
        </div>
    </div>
  )
}

export default AccountRole;