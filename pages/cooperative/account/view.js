import { Button, TextField } from '@mui/material';
import MySelect from '../../../components/form-elements/Select';
import React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import AppLayout from '../../../components/layouts/AppLayout';

const ViewAccountRole = () => {
  const router = useRouter();
  return (
    <AppLayout>
    <div className='flex flex-col gap-[2rem]'>
      <div>
          <Image src='/images/go-back.svg' width='11px' height='17px' alt='back arrow' onClick={() => {
               router.back();
             }} />
      </div>
        <div className='p-[2rem] gap-[2rem] bg-white rounded-xl flex flex-col'>
          <p>Basic Information</p>
          <TextField name="id-name" type={"name"} placeholder=" " id="name" className="w-[100%] " label="Full Name" variant="filled" />
          <TextField name="id-email" type={"email"} placeholder=" " id="email" className="w-[100%] " label="Email Address" variant="filled" />
          
        </div>
        <div className='p-[2rem] bg-white rounded-xl flex flex-col'>
          <p>Role</p>
          <MySelect  label=" Role" items={["Investment Admin", "Financial Admin", "Admin"]}></MySelect>
        </div>
        <div className=' flex justify-end mb-[2rem]'>
          <Button variant="filled" className=' text-white w-[150px] bg-[#137C4B] hover:text-[#137C4B]'>Update</Button>
        </div>
    </div>
    </ AppLayout>
  )
}

export default ViewAccountRole;