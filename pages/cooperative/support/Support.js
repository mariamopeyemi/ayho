import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import React, { useState } from "react";
import Image from 'next/image';
import AppLayout from '../../../components/layouts/AppLayout';

const Support = () => {
    
  const [loading, setLoading] = useState(false);
  return (
    <AppLayout>
        <div className='bg-white rounded-xl p-[4rem]'>
            <p className='mb-[2rem] flex justify-center font-semibold text-[#1D1D1D]'>Need Help? Contact Us Today</p>
            <div className='flex flex-col md:flex-row w-[100%] gap-[2rem] '>
                <div className='bg-blue-200 p-[2rem] rounded-xl items-center gap-[2rem] flex flex-row  w-[100%] md:w-[48%] '>
                    <Image src='/images/blueMsg.svg' alt='message' width='40px' height='40px' />
                    <p>0819334939439</p>
                </div>
                <div className='bg-[#ecc1a5] p-[2rem] rounded-xl items-center gap-[2rem] flex flex-row  w-[100%] md:w-[48%] '>
                    <Image src='/images/pinkTel.svg' alt='message' width='40px' height='40px' />
                    <p>support@gmail.com</p>
                </div>
            </div>
            <div className='flex flex-row mx-[auto] my-[2rem] justify-center gap-[0.5rem] items-center'>
                <hr className='w-[40%] h-[1] border border-solid border-gray-200 ' />
                <p>or</p>
                <hr className='w-[40%] h-[1] border border-solid border-gray-200 ' />
            </div>
            <div className=' flex flex-col gap-[2rem]'>
                <TextField name="id-subject" type={"text"} id="subject" placeholder="Subject" label="Subject" variant="filled" />
                <TextField name="id-message" type={"text"} id="Message" placeholder="Message" label="Message" variant="filled" />
            </div>
            <div className=' w-[full] md:w-[250px] mt-[2rem] '>
            <LoadingButton
                onClick={'/'}
                loading={loading}
                variant="contained"
            >
                Send
          </LoadingButton>
            </div>
        </div>
    </AppLayout>
  )
}

export default Support;