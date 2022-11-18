import React from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import AppLayout from "../../../../components/layouts/AppLayout";
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

const ViewRole = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <div className='flex flex-col gap-[2rem]'>
        <div>
            <Image src='/images/go-back.svg' width='11px' height='17px' alt='back arrow' onClick={() => {
                router.back();
              }} />
        </div>
        <div className='bg-white rounded-xl p-[2rem]'>
          <TextField name="id-role" type={"text"} id="role" label="Role" variant="filled" />

          <p className='text-[#12152899] font-semibold my-[2rem]'>Permission</p>
          <hr className='border border-solid border-gray-200 my-[2rem]' />
          <div className='flex flex-col gap-[2rem]'>
            <div className='flex flex-col md:flex-row '>
              <p className='text-[#1D1D1D] w-[100%] md:w-[40%] font-medium'>Savings Management</p>
              <div className='md:w-[60%] w-[100%] md:gap-[2rem] flex flex-wrap md:flex-row'>
                <FormControlLabel control={<Checkbox  color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Approve" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Decline" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="View" />
            </div>
            </div>
            <div className='flex flex-col md:flex-row '>
              <p className='text-[#1D1D1D] w-[100%] md:w-[40%] font-medium'>Loan Management</p>
              <div className='md:w-[60%] w-[100%] md:gap-[2rem] flex flex-wrap md:flex-row'>
                <FormControlLabel control={<Checkbox  color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Approve" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Decline" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="View" />
            </div>
            </div>
            <div className='flex flex-col md:flex-row '>
              <p className='text-[#1D1D1D] w-[100%] md:w-[40%] font-medium'>Investment Management</p>
              <div className='md:w-[60%] w-[100%] md:gap-[2rem] flex flex-wrap md:flex-row'>
                <FormControlLabel control={<Checkbox  color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Approve" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Decline" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="View" />
            </div>
            </div>
            <div className='flex flex-col md:flex-row '>
              <p className='text-[#1D1D1D] w-[100%] md:w-[40%] font-medium'>Members</p>
              {/* <div className='md:w-[60%] gap-[2rem] flex flex-wrap md:flex-row'> */}
              <div className='md:w-[60%] w-[100%] md:gap-[2rem] flex flex-wrap md:flex-row'>
                <FormControlLabel control={<Checkbox  color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Create" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Edit" />
                <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="View" />
                <FormControlLabel control={<Checkbox  color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Flag" />
            </div>
            </div>
          </div>
        {/* <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked color="success"  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Label" />
          <FormControlLabel disabled control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="Disabled" />
        </FormGroup> */}

        </div>
      </div>
    </AppLayout>
  )
}

export default ViewRole;