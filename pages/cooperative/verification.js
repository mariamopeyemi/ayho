import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import PinInput from "../../components/form-elements/PinInput";
import { verifyToken } from "../../services/cooperative-members.js";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const router = useRouter();
  const [pin, setPin] = useState();
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setLoading(true);
    const data = await verifyToken({
      email: router?.query?.email,
      verifyToken: pin,
    });
    setLoading(false);

    if (data.status) {
      // router.push(`/cooperative/verification?email=${values?.email}`);
      toast.success(data?.message, { duration: 10000 });
    } else {
      toast.error(data?.message, { duration: 10000 });
    }
  };

  return (
    <OnboardingLayout img="/register-img.png">
      <div className="max-w-[326px] w-full h-full flex flex-col py-[10vh] ">
        <h2 className="mb-[2rem] text-[2.4rem] text-text text-center">Registration</h2>
        <div className="grid place-items-center">
          <p className=" text-center text-text font-rubik text-[1.8rem]">Enter 4 digit verification code sent to your email {router?.query?.email && `(${router?.query?.email})`}</p>
          <img height={222} className="mt-[3rem] mb-[2.7rem]  " src={"/key-lock.png"}></img>
          <PinInput
            onChange={(val) => {
              setPin(val);
            }}
          ></PinInput>
          <LoadingButton
            loadingPosition="start"
            // loadingIndicator={<CircularProgress role="progressbar" color="white" size={16} />}
            loading={loading}
            onClick={() => {
              onVerify();
            }}
            sx={{
              mt: "4.5rem",
              "&.MuiLoadingButton-loading": {
                color: "gainsboro",
                // opacity: "90%",
              },
            }}
          >
            {loading ? "Verifying..." : "Verify"}
          </LoadingButton>
          <div className="mt-[2.4rem] grid gap-[1rem] leading-[2.4rem]">
            <a href="#" className="text-[#3A76EC] text-[1.4rem] font-medium text-center">
              Send the code again{" "}
            </a>
            <Link href={"/cooperative/register"}>
              <a className="text-[#3A76EC] text-[1.4rem] font-medium text-center">Change phone number </a>
            </Link>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Register;
