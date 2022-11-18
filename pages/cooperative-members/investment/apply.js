import { TextField } from "@mui/material";
import React, { useState } from "react";
import PLVDesktopDatePicker from "../../../components/form-elements/PLVDesktopDatePicker";
import PLVMenu from "../../../components/form-elements/PLVMenu";
import GoBack from "../../../components/general/GoBack";
import Hrule from "../../../components/general/Hrule";
import Upload from "../../../components/general/Upload";
import AppLayout from "../../../components/layouts/AppLayout";
import PlainContainer from "../../../components/layouts/PlainContainer";
import { motion } from "framer-motion";
import MobileContainer from "../../../components/layouts/MobileContainer";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import SvgIconWrapper from "../../../components/general/SvgIconWrapper";
import GreyBox from "../../../components/general/GreyBox";
import { LoadingButton } from "@mui/lab";
import { createInvestment } from "../../../services/cooperative-members.js";
import { useRouter } from "next/router";
import { NigeriaStates } from "../../../consts/NigeriaStates";

const Apply = () => {
  const router = useRouter();
  const [uploadedImgsUrls, setUploadedImgsUrls] = useState([]);
  const docTypes = [
    { name: "CAC", desc: "CAC Document" },
    { name: "BVN", desc: "BVN Details of principals of applying organizations" },
    { name: "Statement", desc: "Most Recent Bank statement" },
    { name: "Pitch deck", desc: "Pitch deck" },
    ,
  ];
  const [previewLinks, setPreviewLinks] = useState([]);

  const applicationValidationSchema = yup.object({
    companyName: yup.string().required("Company name is required"),
    titleOfBusiness: yup
      .string()
      // .matches("/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/", "must match number")
      .required("Title of Business is required"),
    roi: yup.number().typeError("you must specify a number").min(0, "Min value 0.").max(100, "Roi Max value is 100%"),
    startDate: yup.date("").required("Enter a start date").typeError("Enter a valid date"),
    endDate: yup.date("").min(yup.ref("startDate"), "End date can not be less than start date").required("Enter an end date").typeError("Enter a valid date"),
    establishmentDate: yup.date("").required("Enter establishment date").typeError("Enter a valid date"),
    location: yup.string().required(),
    duration: yup.string().required(),
    category: yup.string().required(),
    targetAmount: yup.number().min(100, "Min target amount is 100.").required("Pls enter an amount").typeError("Enter a valid number"),
    availableUnit: yup.number().min(1, "Min amount 1.").required("Pls enter available unit").typeError("Enter a valid available unit"),
    amountPerUnit: yup.number().min(1, "Min amount of unit is 1").required("Pls enter amount per unit").typeError("Enter  amount per unit"),
    description: yup.string().required(),
  });

  const onApply = async (values, action) => {
    console.log("values and actions are:", values, action);
    const data = await createInvestment(values);
    if (data.status) {
      toast.success(data?.message, { duration: 10000 });
      router.push("/cooperative-members/investment/applications");
    } else {
      toast.error(data?.message, { duration: 10000 });
    }
  };
  return (
    <AppLayout>
      <MobileContainer className={"pt-[1rem]"}>
        <Formik
          initialValues={{
            companyName: "",
            titleOfBusiness: "",
            roi: "",
            startDate: "",
            endDate: "",
            establishmentDate: "",
            location: "",
            duration: "",
            category: "",
            targetAmount: null,
            amountPerUnit: null,
            availableUnit: "",
            description: "",
            documents: [],
            images: [],
            approvalStatus: "pending",
            reasonsForDecline: "",
            // cooperativeId: "d0136219-324d-47e6-9437-c8beb2691ea7",
          }}
          validationSchema={applicationValidationSchema}
          onSubmit={onApply}
        >
          {({ isSubmitting, errors, touched, submitCount, validateForm, values, isValid, setFieldValue, submitForm }) => {
            return (
              <>
                <div className="flex items-center">
                  <GoBack name={"Application"} link={"/cooperative-members/investment/applications"}></GoBack>
                  <LoadingButton
                    loading={isSubmitting}
                    onClick={() =>
                      validateForm().then((err) => {
                        console.log(err, "blah");
                        if (Object.keys(err).length != 0) {
                          toast.error(`${Object.entries(err)[0][1]}`);
                        } else {
                          submitForm();
                        }
                      })
                    }
                    fullWidth={false}
                    className="w-[21.7rem] ml-auto "
                  >
                    Apply
                  </LoadingButton>
                </div>
                <PlainContainer isStrechedMobile={false} className={"mt-[2rem] md:mt-[3rem]"}>
                  <Form className="grid gap-[1.9rem]">
                    <div className="grid grid-flow-row md:grid-cols-3 gap-[1.6rem]">
                      <Field as={TextField} className=" col-span-3 md:col-span-3" label="Company Name" name="companyName" id="Company Name" />
                      <div className=" col-span-3 grid grid-cols-2 gap-[1.6rem]">
                        <Field as={TextField} className=" col-span-2 md:col-span-1" label="Title of Investment" name="titleOfBusiness" id="Title of Investment" />
                        <Field as={TextField} type={"number"} className=" col-span-2 md:col-span-1" label="ROI (%)" name="roi" id="ROI (%)" />
                      </div>
                      <PLVDesktopDatePicker
                        onChange={(date) => {
                          setFieldValue("startDate", date);
                        }}
                        className=" col-span-3 md:col-span-1"
                        label="Start Date"
                      ></PLVDesktopDatePicker>
                      <PLVDesktopDatePicker
                        onChange={(date) => {
                          setFieldValue("endDate", date);
                        }}
                        className=" col-span-3 md:col-span-1"
                        label="End Date"
                      ></PLVDesktopDatePicker>
                      <PLVDesktopDatePicker
                        onChange={(date) => {
                          setFieldValue("establishmentDate", date);
                        }}
                        className=" col-span-3 md:col-span-1"
                        label="Establishment Date"
                      ></PLVDesktopDatePicker>
                      <PLVMenu
                        onChange={(val) => {
                          setFieldValue("location", val);
                        }}
                        className=" col-span-3 md:col-span-1"
                        initText={"Location"}
                        items={NigeriaStates}
                      ></PLVMenu>
                      <PLVMenu
                        onChange={(val) => {
                          setFieldValue("duration", val);
                        }}
                        className=" col-span-3 md:col-span-1"
                        initText={"Duration"}
                        items={["2 Months", "3 Months", "4 Months"]}
                      ></PLVMenu>
                      <PLVMenu
                        onChange={(val) => {
                          setFieldValue("category", val);
                        }}
                        className=" col-span-3 md:col-span-1"
                        initText={"Category"}
                        items={["all", "real-estate", "agriculture", "transportation", "others"]}
                      ></PLVMenu>
                      <Field as={TextField} className=" col-span-3 md:col-span-1" type={"number"} label="Target Amount" name="targetAmount" id="Target Amount" />
                      <Field as={TextField} className=" col-span-3 md:col-span-1" type={"number"} label="Available Unit" name="availableUnit" id="Available Unit" />
                      <Field as={TextField} className=" col-span-3 md:col-span-1" type={"number"} label="Amount Per Unit" name="amountPerUnit" id="Amount Per Unit" />
                      <Field as={TextField} className=" col-span-3 md:col-span-3" rows={8} multiline={true} label="Description" name="description" id="Description" />
                    </div>
                    <Hrule className={"mt-[2.4rem]"}></Hrule>

                    {/* Upload Images */}
                    <p className="my-[.1rem] text-pv_dark font-medium">Upload Images</p>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(239px,_1fr))] gap-[1.6rem]">
                      {uploadedImgsUrls?.map((url, i) => {
                        return (
                          <motion.img
                            initial={{ x: "-10px" }}
                            animate={{ x: 0, transition: "all", animationDelay: "10s" }}
                            className="h-[23.9rem] w-full object-cover rounded-primary"
                            alt="uploads"
                            key={i}
                            src={url}
                          />
                        );
                      })}
                      <Upload
                        onUpload={(fileObjs, fileUrls) => {
                          setUploadedImgsUrls(fileUrls);
                        }}
                        boxClassName={"h-[23.9rem] !p-[6.7rem]"}
                      ></Upload>
                    </div>
                    <Hrule className={"my-[.1rem]"}></Hrule>
                    {/* Document */}
                    <div className="flex items-center justify-between">
                      <p className="my-[.4rem] text-pv_dark font-medium">Document</p>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.africau.edu/images/default/sample.pdf"
                        download="Pitch deck template"
                        className=" h-16 rounded-primary bg-pv_primary cursor-pointer px-[1.5rem] py-[1.2rem] font-medium leading-[2.4rem] text-white font-rubik text-[1.4rem] flex items-center"
                      >
                        Download pitch deck template
                      </a>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(239px,_1fr))] gap-[1.6rem]">
                      {docTypes.map((doc, i) => {
                        return (
                          <div className="grid" key={i}>
                            <Upload
                              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                             text/plain, application/pdf"
                              caption={`Click this area to upload ${doc.name} doc`}
                              uploadImg={<SvgIconWrapper iconName={"document"}></SvgIconWrapper>}
                              onUpload={(fileObjs, fileUrls) => {
                                let links = [...previewLinks];
                                links[i] = fileUrls[0];
                                setPreviewLinks(links);
                              }}
                              boxClassName={"h-[23.9rem] !p-[6.7rem]"}
                            ></Upload>
                            <div className="rounded-primary p-[1.6rem] h-[8rem] bg-pv_bg text-black flex flex-col items-center justify-center self-stretch text-[1.4rem] text-center font-medium">
                              <span> {doc.desc}</span>
                              {previewLinks[i] && (
                                <a target="_blank" rel="noreferrer" href={previewLinks[i]} className=" text-blue-600 cursor-pointer">
                                  preview link
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Form>
                </PlainContainer>
              </>
            );
          }}
        </Formik>
      </MobileContainer>
    </AppLayout>
  );
};

export default Apply;
