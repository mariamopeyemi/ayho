import { TextField } from "@mui/material";
import React, { useState } from "react";
import PLVMenu from "../../../components/form-elements/PLVMenu";
import TabLight from "../../../components/general/TabLight";
import AppLayout from "../../../components/layouts/AppLayout";
import PlainContainer from "../../../components/layouts/PlainContainer";
import NextOfKin from "../../../components/pages/cooperative-members-section/account/NextOfKin";
import PersonalInfo from "../../../components/pages/cooperative-members-section/account/PersonalInfo";
import Refferals from "../../../components/pages/cooperative-members-section/account/Refferals";
import Settings from "../../../components/pages/cooperative-members-section/account/Settings";

const Account = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  return (
    <AppLayout>
      <TabLight
        onChange={(item) => {
          setActiveTab(item);
        }}
        className={"mb-[2.8rem]"}
        active={activeTab}
        items={["Personal Info", "Next of Kin", "Settings", "Referrals"]}
      ></TabLight>
      <main className=" mt-[4.6rem]">
        {activeTab == "Personal Info" && <PersonalInfo></PersonalInfo>}
        {activeTab == "Next of Kin" && <NextOfKin></NextOfKin>}
        {activeTab == "Settings" && <Settings></Settings>}
        {activeTab == "Referrals" && <Refferals></Refferals>}
      </main>
    </AppLayout>
  );
};

export default Account;
