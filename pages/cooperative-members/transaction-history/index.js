import React from "react";
import ReUseableTable from "../../../components/general/ReUseableTable";
import TabLight from "../../../components/general/TabLight";
import AppLayout from "../../../components/layouts/AppLayout";

const index = () => {
  return (
    <AppLayout>
      <main className=" mt-[1.6rem]">
        <TabLight className={"mb-[2.8rem]"} items={["All (2000)", "Pending (400)", "Failed (200)", "Successful (1400)"]}></TabLight>

        <ReUseableTable></ReUseableTable>
      </main>
    </AppLayout>
  );
};

export default index;
