import { Button, TextField } from '@mui/material';
import React from 'react';
import Image from 'next/image';

const CompanyInfo = () => {
  return (
    <div className='flex flex-col gap-[2rem] '>
      <div className='p-[2rem] my-[1rem] rounded-xl bg-white gap-[2rem] flex flex-wrap '>
          <TextField name="id-name" type={"name"} placeholder=" " id="name" className="w-[100%] md:w-[48%]" label="Co-operative Name" variant="filled" />
          <TextField name="id-tel" type={"tel"} placeholder=" " id="number" className="w-[100%] md:w-[48%]" label="Phone Number" variant="filled" />
          <TextField name="id-name" type={"text"} placeholder=" " id="date" className="w-[100%] md:w-[48%]" label="Date of Establishment" variant="filled" />
          <TextField name="id-name" type={"text"} placeholder="labellele " id="date" className="w-[100%] md:w-[48%]" label="Date Joined" variant="filled" />
          <TextField name="id-email" type={"email"} placeholder=" " id="email" className="w-[100%] md:w-[48%]" label="Email Address" variant="filled" />
          <TextField name="id-state" type={"name"} placeholder=" " id="state" className="w-[100%] md:w-[48%]" label="State" variant="filled" />
      </div>
      <div className='p-[2rem] bg-white rounded-xl flex flex-col md:flex-row gap-[2rem] items-center  '>
          <div className='w-full md:w-[50%] px-[2rem] flex flex-row items-center justify-between '>
            <Image src='/images/useravatar.svg' alt='user' width='80px' height='80px' />
            <Button variant="filled" className='text-white w-[150px] bg-[#137C4B] hover:text-[#137C4B]'>Upload New</Button>
            <Button variant="outlined" color="error" className=' w-[150px] '>Delete</Button>
          </div>
          <div className='w-[50%] text-[#666668]'><p>Upload image files with extensions jpg.png.gif or svg</p></div>
      </div>
      <div className='p-[2rem] bg-white rounded-xl flex flex-col'>
        <p>Administrator Details</p>
        <hr className=' my-[2rem] border border-solid border-gray-200' />
        <div className='p-[2rem] my-[1rem] rounded-xl bg-white gap-[2rem] flex flex-wrap '>
          <TextField name="id-name" type={"name"} placeholder=" " id="name" className="w-[100%] md:w-[48%]" label="Full Name" variant="filled" />
          <TextField name="id-tel" type={"tel"} placeholder=" " id="number" className="w-[100%] md:w-[48%]" label="Phone Number" variant="filled" />
          <TextField name="id-email" type={"email"} placeholder=" " id="email" className="w-[100%] md:w-[48%]" label="Email Address" variant="filled" />
          <TextField name="id-address" type={"text"} placeholder=" " id="address" className="w-[100%] md:w-[48%]" label="Address" variant="filled" />
          <TextField name="id-state" type={"name"} placeholder=" " id="state" className="w-[100%] md:w-[48%]" label="State" variant="filled" />
          <TextField name="id-state" type={"name"} placeholder=" " id="lgs" className="w-[100%] md:w-[48%]" label="LGA of Residence" variant="filled" />
      </div>
      </div>
      <div className=' flex justify-end mb-[2rem]'>
        <Button variant="filled" className=' text-white w-[150px] bg-[#137C4B] hover:text-[#137C4B]'>Update</Button>
      </div>
    </div>
  )
}

export default CompanyInfo;