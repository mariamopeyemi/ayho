import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import AppLayout from "../../../components/layouts/AppLayout";
import Hrule from "../../../components/general/Hrule";
import PlainContainer from "../../../components/layouts/PlainContainer";

const Support = () => {
  const [loading, setLoading] = useState(false);
  return (
    <AppLayout>
      <PlainContainer className="mt-[6rem] max-w-[98rem] mx-auto px-[4rem]">
        <p className=" text-[2.4rem] flex justify-center font-semibold text-[#1D1D1D] mb-[4rem]">Need Help? Contact Us Today</p>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[2rem] ">
          <div className="bg-[rgba(58,117,236,0.27)] text-text text-[1.6rem] p-[2rem] px-[4.8rem] h-[9rem] rounded-primary items-center gap-[2rem] flex w-full ">
            <Image src="/images/blueMsg.svg" alt="message" width="40px" height="40px" />
            <p>0819334939439</p>
          </div>
          <div className="bg-[rgba(236,193,165,0.3)] text-text p-[2rem] px-[4.8rem] text-[1.6rem] rounded-primary h-[9rem] items-center gap-[2rem] flex w-full ">
            <Image src="/images/pinkTel.svg" alt="message" width="40px" height="40px" />
            <p>support@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[3.7rem] mb-[1.9rem] px-3">
          <Hrule></Hrule> <p className="mx-[1.2rem] text-text font-medium text-[1.6rem] ">Or</p>
          <Hrule></Hrule>
        </div>
        <div className=" flex flex-col gap-[2rem]">
          <TextField name="id-subject" type={"text"} id="subject" placeholder="Subject" label="Subject" variant="filled" />
          <TextField multiline rows={8} name="id-message" type={"text"} id="Message" placeholder="Message" label="Message" variant="filled" />
        </div>
        <div className=" w-[full] md:w-[250px] mt-[2.8rem] ">
          <LoadingButton loading={loading} variant="contained">
            Send
          </LoadingButton>
        </div>
      </PlainContainer>
    </AppLayout>
  );
};

export default Support;
