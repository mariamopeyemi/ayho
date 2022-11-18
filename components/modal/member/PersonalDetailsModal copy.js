
import React, {useState} from 'react';
import * as yup from "yup";
import toast from "react-hot-toast";
import { LoadingButton } from '@mui/lab';
import { Field, Form, Formik } from "formik";
import MySelect from '../../form-elements/Select';
import { Dialog, Stack, TextField } from '@mui/material';


const PersonalDetailsModal = ({toggle, open, onClick, createMember, setCreateMember, 

}) => {
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // const registerValidationSchema = yup.object({
  //   email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  //   password: yup.string("Enter your password").min(8, "Password should be of minimum 8 characters length").required("Password is required"),
  //   phoneNumber: yup.string().required("Phone number is required"),
  //    });
  const [firstName, setFirstName] =useState('');
  const [lastName, setLastName] =useState('');
  const [email, setEmail] =useState('');
  const [phoneNumber, setPhoneNumber] =useState('');
  const [address, setAddress] =useState('');
  const [state, setState] =useState('');
  const handleSubmit=()=>{
    setCreateMember({...createMember, firstName, lastName, email, state, phoneNumber, address})
    onClick()
  };


  return (
    <Dialog onClose={toggle} open={open}>
        <div className="py-[1rem] px-[auto] rounded-[8px] md:w-[450px] w-full h-[550px] ">
          <div className="flex px-[4rem] flex-row  items-center   ">
              <p>Personal Details - Step 1 of 3</p>
              <span onClick={toggle} className="text text-[28px] text-black ml-[auto] cursor-pointer">&#215;</span>
          </div>
          <hr className='w-[full] mx-[auto] my-[1rem]  border-solid border border-gray-200' />
          
          <Stack gap={"1rem"} className='  px-[4rem]   '>
            <TextField name="id-Fname" onChange={(e)=>setFirstName(e.target.value)} value={firstName} type={"text"} id="savings" label="First Name" variant="filled" />
            <TextField name="id-Lname" onChange={(e)=>setLastName(e.target.value)} value={lastName} type={"text"} id="lname" placeholder="Afolabi" label="Last Name" variant="filled" />
            <TextField name="id-Email" onChange={(e)=>setEmail(e.target.value)} value={email} type={"email"} id="Email" placeholder="opeyemi.afolabi45@gmail.com" label="Email Address (optional)" variant="filled" />
            <TextField name="id-Number" onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} type={"tel"} id="tel" placeholder="+234 906 598 424" label="Phone Number" variant="filled" />
            <MySelect  label=" Gender" items={["Female", "Male", "Others"]}></MySelect>
            <TextField name="id-State" onChange={(e)=>setState(e.target.value)} value={state} type={"text"} id="state" label="State" variant="filled" />
            <TextField name="id-Address" onChange={(e)=>setAddress(e.target.value)} value={address} type={"text"} id="Address" placeholder="House 2 Afolabi Cl. Lagos" label="Address" variant="filled" />
            {/* <TextField name="id-Fname" onChange={(e)=>setNokFirstName(e.target.value)} value={nokFirstName} type={"text"} id="fname" placeholder="Mariam" label="First Name" variant="filled" />
            <TextField name="id-Lname" onChange={(e)=>setNokLastName(e.target.value)} value={nokLastName} type={"text"} id="lname" placeholder="Afolabi" label="Last Name" variant="filled" />
            <TextField name="id-Email" onChange={(e)=>setNokEmail(e.target.value)} value={nokEmail} type={"email"} id="Email" placeholder="opeyemi.afolabi45@gmail.com" label="Email Address (optional)" variant="filled" />
            <TextField name="id-Number" onChange={(e)=>setNokPhone(e.target.value)} value={nokPhone} type={"text"} id="tel" placeholder="+234 906 598 424" label="Phone Number" variant="filled" />
            <TextField name="id-Location" onChange={(e)=>setNokLocation(e.target.value)} value={nokLocation} type={"text"} id="location" placeholder="Lagos, Nigeria" label="Location" variant="filled" />
            <TextField name="id-Rel" onChange={(e)=>setNokRelationship(e.target.value)} value={nokRelationship} type={"text"} id="relationship" placeholder="Brother" label="Relationship" variant="filled" /> */}
            
            <LoadingButton
                    onClick={handleSubmit}
                    variant="contained"
                    className='mt-[1rem]'
                >
                    Save & Continue
                </LoadingButton>
        </ Stack>
        </div>
   </ Dialog>
  )
}

export default PersonalDetailsModal;
// {
//   "firstName": "",
//   "lastName": "",
//   "email": "",
//   "phoneNumber": "",
//   "password": "",
//   "transactionPin": "",
//   "gender": "",
//   "state": "",
//   "lga": "",
//   "address": "",
//   "driverLicense": "",
//   "nin": "",
//   "voterCard": "",
//   "internationalPasspord": "",
//   "nokFirstName": "",
//   "nokLastName": "",
//   "nokPhone": "",
//   "nokEmail": "",
//   "nokLocation": "",
//   "nokRelationship": ""
// }