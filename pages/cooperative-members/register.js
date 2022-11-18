import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Dialog, FilledInput, TextField } from "@mui/material";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import ShowPassword from "../../components/form-elements/ShowPassword";
import { useRouter } from "next/router";
import Link from "next/link";
import PLVCheckBox from "../../components/form-elements/PLVCheckBox";
import SignupWIthButton from "../../components/form-elements/SignupWIthButton";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { register } from "../../services/cooperative-members.js";
import toast from "react-hot-toast";
import RegisterVerificationPopUp from "../../components/pages/cooperative-members-section/popups/RegisterVerificationPopUp";

const Register = () => {
  const [passType, setPassType] = useState("password");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const registerValidationSchema = yup.object({
    email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    password: yup.string("Enter your password").min(8, "Password should be of minimum 8 characters length").required("Password is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    firstName: yup.string("Enter your firstName").required("Firstname is required"),
    lastName: yup.string("Enter your lastName").required("Lastname is required"),
    // cooperativeName: yup.string("Enter your fullname").required("Fullname is required"),
    agree: yup.bool().oneOf([true], "Field must be checked"),
  });

  const onRegister = async (values) => {
    const data = await register(values);
    if (data.status) {
      // pass email to verify popup through router
      router.push(`/cooperative-members/register?email=${values?.email}`);
      openModal();
      toast.success(data?.message, { duration: 10000 });
    } else {
      toast.error(data?.message, { duration: 10000 });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <OnboardingLayout img="/register-img.png">
        <div className="md:max-w-[49.2rem] w-full h-full flex flex-col py-[10vh] ">
          <h2 className="mb-[1rem] text-[2.4rem] text-text">Registration</h2>
          <p className="mb-[3.2rem] text-label">Let’s know a bit about your company and get you setup.</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              transactionPin: "",
              agree: false,
            }}
            validationSchema={registerValidationSchema}
            onSubmit={onRegister}
          >
            {({ isSubmitting, errors, touched, handleChange, values }) => {
              return (
                <Form className="grid gap-[1.9rem]">
                  <input name="email" type="email" className=" hidden" />
                  <input name="password" type="password" className=" hidden" />

                  <Dialog scroll="body" open={open}>
                    <RegisterVerificationPopUp onCancel={handleClose} onRegister={onRegister}></RegisterVerificationPopUp>
                  </Dialog>

                  <Field
                    as={TextField}
                    error={touched.firstName && errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    name="firstName"
                    type={"text"}
                    id="firstName"
                    label="First Name"
                    variant="filled"
                  />
                  <Field
                    as={TextField}
                    error={touched.lastName && errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    name="lastName"
                    type={"text"}
                    id="lastName"
                    label="Last Name"
                    variant="filled"
                  />
                  <Field as={TextField} error={touched.email && errors.email} helperText={touched.email && errors.email} name="email" type={"email"} id="Email" label="Email" />
                  <Field
                    as={TextField}
                    error={touched.phoneNumber && errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    name="phoneNumber"
                    type={"number"}
                    id="phoneNumber"
                    label="Phone Number"
                  />

                  <Field
                    as={TextField}
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                    name="password"
                    InputProps={{
                      endAdornment: (
                        <ShowPassword
                          onChange={(type) => {
                            setPassType(type);
                          }}
                        ></ShowPassword>
                      ),
                    }}
                    type={passType}
                    id="password"
                    label="Create Password"
                  />

                  <div>
                    <div onClick={() => setAgree(!agree)} className="flex items-center mt-[.4rem] mb-[.5rem] text-left">
                      <PLVCheckBox onChange={handleChange} name="agree" id={"agree"} isChecked={values.agree}></PLVCheckBox>
                      <label htmlFor="agree" className=" font-medium text-[1.6rem] text-text ml-[1.4rem] ">
                        I agree to all the <a className=" text-pv_primary cursor-pointer">Terms</a>, <a className=" text-pv_primary cursor-pointer">Privacy Policy</a> and{" "}
                        <a className=" text-pv_primary cursor-pointer">Fees</a>
                      </label>
                    </div>
                    {touched.agree && errors.agree && <span className=" text-error mb-[1.9rem] max-w-lg flex">*pls agree to terms</span>}
                  </div>
                  <LoadingButton
                    onClick={() => {
                      console.log("errors are", errors);
                    }}
                    type="submit"
                    loading={isSubmitting}
                  >
                    Create Account
                  </LoadingButton>
                  <p className=" font-medium text-[1.6rem] text-text ">
                    Already have an account?{" "}
                    <Link href={"/signin"}>
                      <a className=" text-pv_primary">Log in</a>
                    </Link>
                  </p>
                </Form>
              );
            }}
          </Formik>

          <div className="flex items-center justify-between my-[2.9rem] px-3">
            <div className=" flex-1 border-border border-0 border-b bg-transparent border-solid"></div> <p className="mx-[1.2rem] text-text font-medium text-[1.6rem] ">Or</p>
            <div className=" flex-1 border-border border-0 border-b bg-transparent border-solid"></div>
          </div>
          <div className=" grid gap-[2.5rem] grid-flow-row sm:grid-flow-col ">
            <SignupWIthButton img={"/fb.png"} type={"Facebook"}></SignupWIthButton>
            <SignupWIthButton img={"/google.png"} type={"Google"}></SignupWIthButton>
          </div>
        </div>
      </OnboardingLayout>
    </>
  );
};

export default Register;
