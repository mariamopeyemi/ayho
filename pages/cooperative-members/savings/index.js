import { Button, Dialog, InputAdornment, Skeleton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PLVDesktopDatePicker from "../../../components/form-elements/PLVDesktopDatePicker";
import PLVMenu from "../../../components/form-elements/PLVMenu";
import Hrule from "../../../components/general/Hrule";
import AppLayout from "../../../components/layouts/AppLayout";
import PopupLayout from "../../../components/layouts/PopupLayout";
import PLVSwitch from "../../../components/general/PLVSwitch";
import SavingsTypeCard from "../../../components/pages/cooperative-members-section/savings/SavingsTypeCard";
import SavingDetails from "../../../components/pages/cooperative-members-section/savings/SavingDetails";
import { useRouter } from "next/router";
import TabLight from "../../../components/general/TabLight";
import CreateSavingsPopup from "../../../components/pages/cooperative-members-section/popups/CreateSavingsPopUp";
import EmptyState from "../../../components/general/EmptyState";
import { MembersContext } from "../../../context/MembersProvider";
import { buildSavingsHash, getPersonalFixedSavings, getPersonalGoalSavings } from "../../../services/cooperative-members.js";
import toast from "react-hot-toast";
import MobileContainer from "../../../components/layouts/MobileContainer";

export const SavingsTypes = {
  GOAL: "Goal Saving",
  FIXED: "Fixed Saving",
  GROUP: "Group Saving",
};

const Savings = () => {
  const router = useRouter();
  const tabs = [SavingsTypes.GOAL, SavingsTypes.FIXED, SavingsTypes.GROUP];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeSaving, setActiveSaving] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [showSavingDetails, setShowSavingDetails] = useState(false);
  const { fixedSavings, setFixedSavings, goalSavings, setGoalSavings, groupSavings, setGroupSavings } = useContext(MembersContext);

  const handleClose = () => {
    setOpen(false);
  };

  const calcAmount = (el) => {
    if (activeTab == SavingsTypes.GOAL) {
      console.log("target amot", el?.targetAmount);
      return el?.targetAmount;
    } else if (activeTab == SavingsTypes.FIXED) {
      return el?.amountTobeSaved;
    }
  };

  const handleTabChange = (item) => {
    setActiveTab(item);
    if (item == SavingsTypes.FIXED) {
      setActiveSaving(fixedSavings.data);
      console.log("fixed savigns", fixedSavings.data);
      if (!fixedSavings.data) {
        fetchBuildStoreSavings(SavingsTypes.FIXED);
      }
    }
    if (item == SavingsTypes.GOAL) {
      setActiveSaving(goalSavings.data);
      console.log("goal savigns", goalSavings.data);
      if (!goalSavings.data) {
        fetchBuildStoreSavings(SavingsTypes.GOAL);
      }
    }
    if (item == SavingsTypes.GROUP) {
      setActiveSaving(groupSavings.data);
      console.log("group savigns", groupSavings.data);
      if (!groupSavings.data) {
        // fetchBuildStoreSavings(SavingsTypes.Group);
      }
    }
  };

  const fetchBuildStoreSavings = async (type) => {
    setLoading(true);
    let respData;
    if (type == SavingsTypes.FIXED) {
      respData = await getPersonalFixedSavings();
    } else if (type == SavingsTypes.GOAL) {
      respData = await getPersonalGoalSavings();
    } else {
    }

    if (respData?.status) {
      if (type == SavingsTypes.FIXED) {
        // console.log("fixed savings hash is:", setFixedSavings, fixedSavings.data, respData.data.data, buildSavingsHash(respData.data.data));
        setFixedSavings({ data: respData.data.data, hash: buildSavingsHash(respData.data.data) });
        setActiveSaving(respData.data.data);
        setActiveTab(type);
      } else if (type == SavingsTypes.GOAL) {
        setGoalSavings({ data: respData.data.data, hash: buildSavingsHash(respData.data.data) });
        setActiveSaving(respData.data.data);
        setActiveTab(type);
      }
    } else {
      toast.error("Error getting savings. Try again later");
    }

    setLoading(false);
  };

  const onCreateSavings = (type) => {
    fetchBuildStoreSavings(type);
    handleClose();
  };

  useEffect(() => {
    if (!goalSavings.data) {
      fetchBuildStoreSavings(SavingsTypes.GOAL);
    } else {
      setActiveSaving(goalSavings.data);
      setLoading(false);
    }
  }, []);
  return (
    <AppLayout>
      <MobileContainer>
        <Dialog scroll="body" sx={{ boxShadow: "none" }} onClose={handleClose} open={open}>
          <CreateSavingsPopup onCreateSavings={onCreateSavings} onClose={handleClose}></CreateSavingsPopup>
        </Dialog>

        <div className="flex items-center justify-between">
          <TabLight active={activeTab} setActive={handleTabChange} items={tabs}></TabLight>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            sx={{ maxWidth: "18.3rem" }}
            variant="contained"
          >
            Create Plan
          </Button>
        </div>
        {!loading && (!activeSaving || activeSaving?.length < 1) && <EmptyState className={"min-h-[75vh]"} caption={`No ${activeTab} plan.`} img={"/empty-savings.png"}></EmptyState>}
        {loading && (!activeSaving || activeSaving?.length < 1) && (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(2,_minmax(300px,_1fr))] gap-[2.7rem] mt-[3.2rem]">
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
            <Skeleton variant="rectangular" className=" rounded-primary w-full" animation="wave" height={118} />
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(2,_minmax(300px,_1fr))] gap-[2.7rem] mt-[3.2rem]">
          {activeSaving?.map((el, i) => {
            return (
              <SavingsTypeCard
                key={i}
                onClick={() => {
                  router.push(`/cooperative-members/savings/${el?.id}?type=${activeTab}`);
                }}
                amount={calcAmount(el)}
                type={el?.title}
                status={el?.statusOfPlan}
                className="bg-[rgba(181,72,198,0.26)] cursor-pointer"
              ></SavingsTypeCard>
            );
          })}

          {/* <SavingsTypeCard
          onClick={() => {
            router.push("/cooperative-members/savings/Agro-Allied Savings");
          }}
          amount={"N40,0000"}
          type={"Agro-Allied"}
          status={"Ongoing"}
          className="bg-[rgba(58,117,236,0.24)] cursor-pointer"
        ></SavingsTypeCard>
        <SavingsTypeCard
          onClick={() => {
            router.push("/cooperative-members/savings/Agro-Allied Savings");
          }}
          amount={"N500,0000"}
          type={"Agro-Allied"}
          status={"Ongoing"}
          className="bg-[rgba(255,115,21,0.22)] cursor-pointer"
        ></SavingsTypeCard> */}
        </div>

        {/* {showSavingDetails && (
        <SavingDetails
          onClose={() => {
            setShowSavingDetails(false);
          }}
          title={"Agro-Allied Savings"}
        ></SavingDetails>
      )} */}
      </MobileContainer>
    </AppLayout>
  );
};

export default Savings;
