import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { Field, Form, Formik } from "formik";
import { Dialog, TextField } from "@mui/material";
import VerifyModal from "../../components/modal/VerifyModal";
import { register } from "../../services/cooperative-members.js";
import { adminRegister } from "../../services/cooperative-admin.js";
import PLVCheckBox from "../../components/form-elements/PLVCheckBox";
import ShowPassword from "../../components/form-elements/ShowPassword";
import OnboardingLayout from "../../components/layouts/OnboardingLayout";
import RegisterVerificationPopUp from "../../components/pages/cooperative-members-section/popups/RegisterVerificationPopUp";

const SignUp = () => {
  const [passType, setPassType] = useState("password");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const registerValidationSchema = yup.object({
    email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    password: yup.string("Enter your password").min(8, "Password should be of minimum 8 characters length").required("Password is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    // transactionPin: yup
    //   .string("Enter your preferred Pin")
    //   .min(4, "Transaction Pin should be of minimum 4 characters length")
    //   .max(4, "Transaction Pin should be of maximum 4 characters length")
    //   .required("Transaction Pin is required"),
    cooperativeName: yup.string("Enter your fullname").required("Fullname is required"),
    agree: yup.bool().oneOf([true], "Field must be checked"),
  });

  // function onRegister(){}
  const onRegister = async (values) => {
    const data = await adminRegister(values);
    if (data.status) {
      // pass email to verify popup through router
      router.push(`/cooperative/register?email=${values?.email}`);
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
  function terms() {
    router.push("/terms");
  }
  return (
    <OnboardingLayout signup={true}>

      <div className="max-w-[49.2rem] w-full  my-[auto]">
        <h2 className="mb-[1rem] text-[2.4rem] text-text">Registration</h2>
        <p className="mb-[2.2rem] text-label">Let’s know a bit about your company and get you setup.</p>
        <Formik
          initialValues={{
            email: "",
            password: "",
            cooperativeName: "",
            phoneNumber: "",
            // transactionPin: "",
            agree: false,
          }}
          validationSchema={registerValidationSchema}
          onSubmit={onRegister}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => {
            return (
              <Form className="grid gap-[1.9rem]">
                <Dialog scroll="body" open={open}>
                  <VerifyModal onCancel={handleClose} onRegister={onRegister} />
                </Dialog>

                <Field
                  as={TextField}
                  error={touched.cooperativeName && errors.cooperativeName}
                  helperText={touched.cooperativeName && errors.cooperativeName}
                  name="cooperativeName"
                  type={"text"}
                  id="cooperativeName"
                  label="Cooperative Name"
                  variant="filled"
                />
                <Field as={TextField} error={touched.email && errors.email} helperText={touched.email && errors.email} name="email" type={"email"} id="Email" label="Email" />
                <Field
                  as={TextField}
                  error={touched.phoneNumber && errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  name="phoneNumber"
                  type={"text"}
                  id="phoneNumber"
                  label="Phone Number"
                />
                {/* <Field
                  as={TextField}
                  error={touched.transactionPin && errors.transactionPin}
                  helperText={touched.transactionPin && errors.transactionPin}
                  name="transactionPin"
                  type={"text"}
                  id="transactionPin"
                  label="Transaction Pin"
                /> */}

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
                  <div onClick={() => setAgree(!agree)} className="flex items-center mt-[.4rem] mb-[.5rem]">
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
                <p className=" font-medium text-[1.6rem] text-text">
                  Already have an account?{" "}
                  <Link href={"/signin"} passHref>
                    <a className=" text-pv_primary">Log in</a>
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </OnboardingLayout>
  );
};

export default SignUp;
