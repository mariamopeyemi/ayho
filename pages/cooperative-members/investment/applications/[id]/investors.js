import { useRouter } from "next/router";
import React from "react";
import GoBack from "../../../../../components/general/GoBack";
import ReUseableTable from "../../../../../components/general/ReUseableTable";
import AppLayout from "../../../../../components/layouts/AppLayout";

const Investors = () => {
  const router = useRouter();
  const headers = ["Name", "Tot.  Amt", "No of units", "Expected ROI"];
  const rows = [
    { name: "Winner Okpere", date: "N500,000", units: "20", roi: "15%" },
    { name: "Ada Kosiso", date: "N100,000", units: "50", roi: "10%" },
    { name: "Harry Wales", date: "N100,000", units: "50", roi: "10%" },
    { name: "Winner Okpere", date: "N100,000", units: "50", roi: "10%" },
  ];
  return (
    <AppLayout>
      <GoBack
        name={`${router?.query?.id} Investors`}
        link={`/cooperative-members/investment/applications/${router?.query?.id}/?status=${router?.query?.status}&label=${router?.query?.label}`}
      ></GoBack>
      <ReUseableTable rows={rows} headers={headers} className={"mt-[5rem]"}></ReUseableTable>
    </AppLayout>
  );
};

export default Investors;
