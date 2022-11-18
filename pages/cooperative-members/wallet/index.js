import React from "react";
import StatCardWithBtn from "../../../components/cards/StatCardWithBtn";
import ReUseableTable from "../../../components/general/ReUseableTable";
import TabLight from "../../../components/general/TabLight";
import AppLayout from "../../../components/layouts/AppLayout";

const Wallet = () => {
  return (
    <AppLayout>
      <StatCardWithBtn
        className={"max-w-[52.1rem] !h-[15.2rem] px-[3.4rem] mt-[3.2rem]"}
        value={"N0"}
        title="E-wallet Balance"
        bgColor="linear-gradient(263.28deg, #2A9D8F 1.44%, #2A9D8F 1.45%, #41C768 100%)"
      ></StatCardWithBtn>
      <main className=" mt-[5.6rem]">
        <TabLight className={"mb-[2.8rem]"} items={["All (2000)", "Pending (400)", "Failed (200)", "Successful (1400)"]}></TabLight>

        <ReUseableTable></ReUseableTable>
      </main>
    </AppLayout>
  );
};

export default Wallet;
