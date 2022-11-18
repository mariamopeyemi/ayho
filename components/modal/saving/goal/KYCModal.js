import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Dialog, Stack,Autocomplete, TextField } from '@mui/material';
import PLVDesktopDatePicker from '../../../form-elements/PLVDesktopDatePicker';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const KYCModal = ({toggle, open, onClick}) => {

    return (
      <Dialog onClose={toggle} open={open}>
          <div className=" pt-[2rem] pb-[3rem] rounded-[8px] md:w-[400px] w-full ">
            <div className=" px-[4rem] flex items-end mb-8 ">
                <p>KYC Updates</p>
                <span onClick={toggle} className="text text-[28px] text-black ml-[auto] cursor-pointer">&#215;</span>
            </div>
            <hr className='w-[105%] mx-[auto] my-[2rem] border-solid border border-gray-200' />
            <Stack gap={"3rem"} className='px-[4rem] items-center flex flex-col'>
            <PLVDesktopDatePicker onChange={(e)=>setInputValue({...inputValue, startDate:e})} value={inputValue.startDate} label="start Date" />
            
                <div className='w-[100%]'>
                <LoadingButton
                    onClick={onClick}
                    variant="contained"
                >
                    Done
                </LoadingButton>
                </div>
      
            </Stack>
        </div>
    </Dialog>
  )
}

export default KYCModal;