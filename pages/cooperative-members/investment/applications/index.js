import { Button, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "../../../../components/general/EmptyState";
import TabLight from "../../../../components/general/TabLight";
import TabLightV2 from "../../../../components/general/TabLightV2";
import AppLayout from "../../../../components/layouts/AppLayout";
import MobileContainer from "../../../../components/layouts/MobileContainer";
import ApplicationCard from "../../../../components/pages/cooperative-members-section/investment/ApplicationCard";
import LoanCard from "../../../../components/pages/cooperative-members-section/loan/LoanCard";
import { MembersContext } from "../../../../context/MembersProvider";
import useFetchDataBuildHashStoreToState from "../../../../hooks/useFetchDataBuildHashStoreToState";
import { buildDataIdHash, getAllInvestmentApplications } from "../../../../services/cooperative-members.js";

const Applications = () => {
  const router = useRouter();
  const { investmentApplications, setInvestmentApplications } = useContext(MembersContext);
  const { fetchDataBuildHashStoreToState } = useFetchDataBuildHashStoreToState(getAllInvestmentApplications, setInvestmentApplications);
  const filterApplications = (status) => {
    if (status.includes("All")) {
      return investmentApplications?.data;
    }
    return investmentApplications?.data?.filter((app) => {
      return app?.planvestApprovalStatus?.includes(status?.toLocaleLowerCase());
    });
  };
  const tabs = [
    `All (${filterApplications("All")?.length || 0})`,
    `Pending (${filterApplications("pending")?.length || 0})`,
    `Active (${filterApplications("active")?.length || 0})`,
    `Declined (${filterApplications("declined")?.length || 0})`,
    `Completed (${filterApplications("completed")?.length || 0})`,
  ];
  // const applications = [
  //   {
  //     name: "Business Name",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Active",
  //     amountRequested: "10%",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "Business Name",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Pending",
  //     amountRequested: "10%",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "Business Name",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Completed",
  //     amountRequested: "10%",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "Business Name",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Declined",
  //     amountRequested: "10%",
  //     dateRequested: "23/05/2022",
  //   },
  // ];
  const [filteredApplications, setFilteredApplications] = useState();
  const [activeTab, setActiveTab] = useState();

  const onApplicationTypeChange = (item) => {
    setActiveTab(item);
    if (item.includes("All")) {
      return setFilteredApplications(investmentApplications.data);
    }
    const formattedItem = item?.split(" ")[0];
    console.log("item is", formattedItem);
    const newFilter = filterApplications(formattedItem);
    setFilteredApplications(newFilter);
  };
  const [page, setPage] = useState("Applications");

  useEffect(() => {
    fetchDataBuildHashStoreToState();
  }, []);
  useEffect(() => {
    setFilteredApplications(filterApplications("All"));
    setActiveTab(tabs[0]);
    console.log("application chage");
  }, [investmentApplications?.data]);

  return (
    <>
      <AppLayout>
        <MobileContainer>
          <div className="flex items-center flex-wrap justify-between mb-[3rem]">
            <TabLightV2
              onChange={(item) => {
                item != "Applications" && router.push("/cooperative-members/investment/plans");
              }}
              active={page}
              items={["Applications", "Investment Plans"]}
            ></TabLightV2>
            <Button
              onClick={() => {
                router.push("/cooperative-members/investment/apply");
              }}
              sx={{ maxWidth: "18.3rem" }}
            >
              Apply
            </Button>
          </div>
          <TabLight active={activeTab} onChange={onApplicationTypeChange} items={tabs}></TabLight>
          {(!filteredApplications || filteredApplications?.length < 1) && (
            <EmptyState className={"min-h-[75vh]"} caption={`No ${activeTab?.includes("All") ? "" : activeTab?.split(" ")[0] ?? ""} application.`} img={"/empty-savings.png"}></EmptyState>
          )}
          <div className="mt-[3.2rem] grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-[1.6rem] items-stretch">
            {filteredApplications?.map((application, i) => {
              return <ApplicationCard application={application} key={i}></ApplicationCard>;
            })}
          </div>
        </MobileContainer>
      </AppLayout>
    </>
  );
};

export default Applications;
