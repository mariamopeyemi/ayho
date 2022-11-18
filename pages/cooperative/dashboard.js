import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import Image from "next/image";
import AppLayout from "../../components/layouts/AppLayout";
import Filter from "../../components/fillter/MonthlyFilter";
import Blurb from "../../components/cards/Blurb";
import FlexCard from "../../components/cards/FlexCard";
// import StatCard from "../../components/cards/StatCard";
import LabelTag from "../../components/buttons/LabelTag";
import PLVMenu from "../../components/form-elements/PLVMenu";
import StatCard from "../../components/cards/StatCard";
import { AuthContext } from "../../context/AuthContextProvider";

const Dashboard = () => {
  const [empty, setEmpty] = useState(true);
  // const [emptyInvest, setEmptyInvest] =useState(true);
  const { user } = useContext(AuthContext);
  return (
    <AppLayout>
      <div className="flex md:items-center md:flex-row flex-col">
        <div className="flex flex-col ">
          <h2 className="h2 mb-[1.6rem]">Welcome Back {user?.cooperativeName?.split(" ")[0] ?? user?.firstName ?? "Guest"} 👋🏼</h2>

          <p className="body_1">Your current status and analytics are here</p>
        </div>
        {/* <Button variant="contained" sx={{ width: 208, ml: "auto" }}>
          Supposed Select
        </Button> */}
        <div className="ml-auto">
          {/* <Filter  /> */}
          <PLVMenu className="ml-auto bg-white max-w-[20.8rem] pl-[3.2rem]" items={["Monthly", "Weekly", "Daily"]}></PLVMenu>
        </div>
      </div>

      <section className="grid grid-flow-col gap-[1.54rem] overflow-x-scroll  scroll_hide my-[3.2rem]">
        <StatCard className={"h-[13.7rem]"} bgColor="linear-gradient(263.28deg, #2A9D8F 1.44%, #2A9D8F 1.45%, #41C768 100%)" title="No of members" value="300"></StatCard>
        <StatCard bgColor="linear-gradient(263.32deg, #051EA4 0.96%, #1A8EF0 100%)" title="No of Loan Applicant" value="40"></StatCard>
        <StatCard bgColor="linear-gradient(263.39deg, #9811AD 0%, #E363D6 100%)" title="No of Investment Applicant" value="50"></StatCard>
        <StatCard bgColor="linear-gradient(263.39deg, #230B34 0%, #8B31CA 100%)" title="No of Group Savings" value="10"></StatCard>
      </section>

      <div className="row gap-[24px] flex flex-col md:flex-row mb-[3rem]">
        <div className="rounded-xl flex flex-col w-[full] md:w-[49%] bg-white my-[0px] p-[3rem] h-[auto]">
          <p className="">saving analytics</p>
          <hr className="my-[1.5rem]" />

          <div className="mb-[4rem] ">
            <p className="text-[#137C4B] font-extrabold my-[3rem]">Goal Savings</p>
            <div className="rounded-xl bg-[#F1F1F1] p-[3rem] flex flex-col ">
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Created Plan</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">3</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Users</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">100</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Amt</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">N200,000</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Interest Earned</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">N10,000</p>
              </div>
            </div>
          </div>
          <div className="mt-[4rem]  ">
            <p className="text-[#137C4B] font-extrabold my-[3rem]">Fixed Savings</p>
            <div className="rounded-xl bg-[#F1F1F1] p-[3rem] flex flex-col ">
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Created Plan</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">1</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Users</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">20</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Amt</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">N150,000</p>
              </div>
              <div className="flex flex-row my-[1rem] ">
                <p className="h-full body_heavy text-black-default flex items-center w-[70%] ">Tot. Interest Earned</p>
                <p className="h-full caption_heavy text-gray-white flex items-center w-[30%] ml-[20px]">N10,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl flex flex-col gap-[24px] w-[full] md:w-[49%] ">
          {empty ? (
            <div className="h-[auto] rounded-xl mb-[2rem] bg-white p-[2rem]">
              <p className="">Investment Applicants</p>
              <hr className="my-[2rem]" />
              <Image onClick={() => setEmpty(!empty)} src="/images/empty.svg" alt="empty state" height="200px" width="350px" />
              <p className="my-[2rem] text-center">No Applications</p>
            </div>
          ) : (
            <div className="h-[auto] rounded-xl mb-[2rem] bg-white p-[2rem]">
              <div className="border-black border-b border-2 flex flex-row justify-between">
                <p className="">Investment Applicants</p>
                <p className="underline text-[#137C4B] font-extrabold  ">View All</p>
              </div>
              <hr className="my-[2rem]" />
              <div className="my-[1rem] px-[0.5rem] flex flex-row bg-white justify-between items-center">
                <Blurb src="/images/avataRR.png" item="Alex Brandon" date="Today" />
                <LabelTag text="Pending" status="warn"></LabelTag>
              </div>
              <div className="my-[1rem] px-[0.5rem] flex flex-row bg-white justify-between items-center">
                <Blurb src="/images/avataRR.png" item="Esther Howart" date="May 14th" />
                <LabelTag text="In Progress" status="progress"></LabelTag>
              </div>
              <div className="my-[1rem] px-[0.5rem] flex flex-row bg-white justify-between items-center">
                <Blurb src="/images/avataRR.png" item="Leslie Alexander" date="May 12th" />
                <LabelTag text="Pending" status="warn"></LabelTag>
              </div>
              <div className="my-[1rem] px-[0.5rem] flex flex-row bg-white justify-between items-center">
                <Blurb src="/images/avataRR.png" item="Alex Brandon" date="May 14th" />
                <LabelTag text="Pending" status="warn"></LabelTag>
              </div>
            </div>
          )}
          {empty ? (
            <div className="h-[auto] rounded-xl mb-[2rem] bg-white p-[2rem]">
              <p className="">Loan Applicants</p>
              <hr className="my-[2rem]" />
              <Image onClick={() => setEmpty(!empty)} src="/images/empty.svg" alt="empty state" height="200px" width="350px" />
              <p className="my-[2rem] text-center">No Applications</p>
            </div>
          ) : (
            <div className="h-[auto] rounded-xl pb-[2rem] bg-white p-[2rem]">
              <div className="border-black border-b border-2 flex flex-row justify-between">
                <p className="">Loan Applicants</p>
                <p className="underline text-[#137C4B] font-extrabold ">View All</p>
              </div>
              <hr className="my-[2rem]" />
              <div className="gap-[1rem] px-[0.5rem] flex flex-col bg-white justify-between items-center">
                <FlexCard src="/images/avataRR.png" name="Alex Brandon" amount="N300,000" status="Pending" date="Today" />
                <FlexCard src="/images/avataRR.png" name="Esther Howart" amount="N250,000" status="Pending" date="May 14th" />
                <FlexCard src="/images/avataRR.png" name="Leslie Alexander" amount="N300,000" status="Pending" date="May 6th" />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
