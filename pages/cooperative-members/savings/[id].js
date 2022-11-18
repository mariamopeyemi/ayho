import { Skeleton } from "@mui/material";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SvgIconWrapper from "../../../components/general/SvgIconWrapper";
import AppLayout from "../../../components/layouts/AppLayout";
import MobileContainer from "../../../components/layouts/MobileContainer";
import Details from "../../../components/pages/cooperative-members-section/savings/Details";
import SavingsInfo from "../../../components/pages/cooperative-members-section/savings/SavingsInfo";
import StatActionBox from "../../../components/pages/cooperative-members-section/savings/StatActionBox";
import Transactions from "../../../components/pages/cooperative-members-section/savings/Transactions";
import { MembersContext } from "../../../context/MembersProvider";
import { getPersonalFixedSavings, getSinglePersonalFixedSavings, getSinglePersonalGoalSavings } from "../../../services/cooperative-members.js";
import { SavingsTypes } from "./index";

const SavingDetails = () => {
  const router = useRouter();
  const { fixedSavings, goalSavings, setFixedSavings, setGoalSavings } = useContext(MembersContext);
  const saving = router?.query?.type == SavingsTypes.FIXED ? fixedSavings.hash[router?.query?.id] : goalSavings.hash[router?.query?.id];
  // console.log("savings is", saving, router?.query?.type, fixedSavings, SavingsTypes.FIXED);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaving = async () => {
      const respData = router?.query?.type == SavingsTypes.FIXED ? await getSinglePersonalFixedSavings(router?.query?.id) : await getSinglePersonalGoalSavings(router?.query?.id);
      if (respData?.status) {
        router?.query?.type == SavingsTypes.FIXED
          ? setFixedSavings((val) => ({ ...val, hash: { ...val?.hash, [router?.query?.id]: respData?.data } }))
          : setGoalSavings((val) => ({ ...val, hash: { ...val?.hash, [router?.query?.id]: respData?.data } }));
      }
    };

    if (router?.isReady) {
      if (!saving) {
        setLoading(true);
      }

      fetchSaving();
      setLoading(false);
    }
  }, [router?.isReady]);

  return (
    <AppLayout>
      <MobileContainer>
        {loading && (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(2,_minmax(300px,_1fr))] gap-[2.7rem] mt-[3.2rem]">
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
          </div>
        )}
        {saving && (
          <>
            <Link href={"/cooperative-members/savings/"}>
              <a className=" items-center cursor-pointer inline-flex">
                <SvgIconWrapper className={"!h-[1.2rem]"} iconName={"arrow-filled "}></SvgIconWrapper>
                <p className=" font-rubik text-pv_dark text-[2.2rem] ml-[2.7rem] capitalize">{saving?.title}</p>
              </a>
            </Link>

            <main className="mt-[4.2rem] grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] 2xl:grid-cols-[1.5fr,_1fr] gap-[2.4rem]">
              <div>
                <StatActionBox></StatActionBox>
                <Transactions></Transactions>
              </div>
              <div>
                {saving?.amountSavedPerTime != null && <SavingsInfo saving={saving}></SavingsInfo>}
                <Details saving={saving}></Details>
              </div>
            </main>
          </>
        )}
      </MobileContainer>
    </AppLayout>
  );
};

export default SavingDetails;
