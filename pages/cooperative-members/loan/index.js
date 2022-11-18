import { Button, Dialog } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../../../components/general/EmptyState";
import TabLight from "../../../components/general/TabLight";
import TabLightV2 from "../../../components/general/TabLightV2";
import AppLayout from "../../../components/layouts/AppLayout";
import MobileContainer from "../../../components/layouts/MobileContainer";
import LoanCard from "../../../components/pages/cooperative-members-section/loan/LoanCard";
import ApplyLoanPopUp from "../../../components/pages/cooperative-members-section/popups/ApplyLoanPopUp";
import EligibilityPopUp from "../../../components/pages/cooperative-members-section/popups/EligibilityPopUp";
import EnterPinPopUp from "../../../components/pages/cooperative-members-section/popups/EnterPinPopUp";
import LoanSummaryPopUp from "../../../components/pages/cooperative-members-section/popups/LoanSummaryPopUp";
import SuccessPopUp from "../../../components/pages/cooperative-members-section/popups/SuccessPopUp";
import { MembersContext } from "../../../context/MembersProvider";
import useFetchDataBuildHashStoreToState from "../../../hooks/useFetchDataBuildHashStoreToState";
import { buildDataIdHash, createLoan, getAllLoans } from "../../../services/cooperative-members.js";
import { uploadFile } from "../../../services/generalService";

const Loan = () => {
  // const loans = [
  //   {
  //     name: "Business Loan",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Active",
  //     amountRequested: "N300,000",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "Company Loan",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Pending",
  //     amountRequested: "N300,000",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "KFC Loan",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Completed",
  //     amountRequested: "N300,000",
  //     dateRequested: "23/05/2022",
  //   },
  //   {
  //     name: "Sony Loan",
  //     desc: "Sambara farms is a livestock farm. We rear cows, goats, sheeps and have a poultry.",
  //     status: "Declined",
  //     amountRequested: "N300,000",
  //     dateRequested: "23/05/2022",
  //   },
  // ];
  const { loans, setLoans } = useContext(MembersContext);
  const { fetchDataBuildHashStoreToState } = useFetchDataBuildHashStoreToState(getAllLoans, setLoans);
  console.log("loan render", loans);
  const [activeLoanType, setActiveLoanType] = useState("Personal Loans");

  const filterLoans = (status) => {
    if (status.includes("All")) {
      return loans.data?.filter((loan) => {
        return activeLoanType?.toLocaleLowerCase().includes(loan?.loanType?.toLocaleLowerCase());
      });
    }
    return loans.data?.filter((loan) => {
      return loan?.coopApprovalStatus?.includes(status?.toLocaleLowerCase()) && activeLoanType?.toLocaleLowerCase().includes(loan?.loanType?.toLocaleLowerCase());
    });
  };
  const tabs = [
    `All (${filterLoans("All")?.length || 0})`,
    `Pending (${filterLoans("pending")?.length || 0})`,
    `Active (${filterLoans("active")?.length || 0})`,
    `Declined (${filterLoans("declined")?.length || 0})`,
    `Completed (${filterLoans("completed")?.length || 0})`,
  ];
  const [filteredLoans, setFilteredLoans] = useState();
  const [activeTab, setActiveTab] = useState();
  const [loanSummary, setLoanSummary] = useState({});

  const onLoanTypeChange = (item) => {
    setActiveTab(item);
    // if (item.includes("All")) {
    //   return setFilteredLoans(loans?.data);
    // }
    const formattedItem = item?.split(" ")[0];
    console.log("item is", formattedItem);
    const newFilter = filterLoans(formattedItem);
    setFilteredLoans(newFilter);
  };
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const openModal = (name) => {
    setOpen(true);
    setActiveModal(name);
  };

  // popup functions
  const onApply = () => {
    setActiveModal("ApplyLoanPopUp");
  };
  const onApplyLoan = (loanDetails) => {
    setLoanSummary(loanDetails);
    setActiveModal("LoanSummaryPopUp");
  };
  const onGoBackToLoan = () => {
    setActiveModal("ApplyLoanPopUp");
  };
  const onReadSummary = () => {
    setActiveModal("EnterPinTopup");
  };
  const onEnterPin = async (actions) => {
    console.log("loan summar", loanSummary);
    actions?.setLoading(true);

    let loanDetails = { ...loanSummary };
    if (loanSummary?.loanType != "personal") {
      // upload cac and pitch deck before creation
      // After upload get the file url and type
      // build documents array: [{url:"", type: cac|pitchDeck}]
      let docs = [];
      const pitchDeckFileRespData = await uploadFile(loanSummary?.pitchDeck, "pitchDeck");
      console.log("pitchDeckFileRespData", pitchDeckFileRespData);
      if (pitchDeckFileRespData?.success) {
        docs.push(pitchDeckFileRespData.data);
      } else {
        if (pitchDeckFileRespData.statusCode == 0) {
          toast.error("Pitch Deck file too Large");
        } else {
          toast.error("Problem uploading Pithc Deck file. Pls try again later or contact support.");
        }
        actions?.setLoading(false);
        return;
      }

      // -----------------------------------
      const CACRespData = await uploadFile(loanSummary?.CAC, "CAC");
      if (CACRespData?.success) {
        docs.push(CACRespData.data);
      } else {
        if (pitchDeckFileRespData.statusCode == 0) {
          toast.error("CAC file too Large");
        } else {
          toast.error("Problem uploading CAC file. Pls try again later or contact support.");
        }
        actions?.setLoading(false);
        return;
      }

      console.log("docs are", docs);
      loanDetails = { ...loanSummary, documents: docs };
    }

    const respData = await createLoan(loanDetails);
    if (respData.status) {
      setActiveModal("SuccessTopup");
      fetchDataBuildHashStoreToState();
      if (loanSummary?.loanType == "personal") {
        setActiveLoanType("Personal Loans");
      } else {
        setActiveLoanType("Corporate Loans");
      }
    } else {
      toast.error(respData?.message || "Problem requesting loan, please try again later or contact support!");
    }
    actions?.setLoading(false);
  };

  const onActiveLoanTypeChange = (item) => {
    setActiveLoanType(item);
  };

  useEffect(() => {
    fetchDataBuildHashStoreToState();
    // if (!loans.data) {
    //   fetchBuildStoreLoans();
    // }
  }, []);
  useEffect(() => {
    setFilteredLoans(filterLoans("All"));
    setActiveTab(tabs[0]);
  }, [activeLoanType]);
  useEffect(() => {
    setFilteredLoans(filterLoans("All"));
    setActiveTab(tabs[0]);
    console.log("loan chage");
  }, [loans?.data]);

  return (
    <>
      <Dialog scroll="body" onClose={handleClose} open={open}>
        {activeModal == "EligibilityPopUp" && <EligibilityPopUp onApply={onApply}></EligibilityPopUp>}
        {activeModal == "ApplyLoanPopUp" && <ApplyLoanPopUp onClose={handleClose} loanDetails={loanSummary} onApplyLoan={onApplyLoan}></ApplyLoanPopUp>}
        {activeModal == "LoanSummaryPopUp" && <LoanSummaryPopUp loanSummary={loanSummary} onReadSummary={onReadSummary} onGoBack={onGoBackToLoan} onClose={handleClose}></LoanSummaryPopUp>}
        {activeModal == "EnterPinTopup" && <EnterPinPopUp onCancel={handleClose} onAction={onEnterPin} actionText={"Apply"}></EnterPinPopUp>}
        {activeModal == "SuccessTopup" && <SuccessPopUp onCancel={handleClose} onAction={handleClose} actionText={"Ok"} caption={"Application successfully sent and waiting approval."}></SuccessPopUp>}
      </Dialog>
      <AppLayout>
        <MobileContainer>
          <div className="flex items-center flex-wrap justify-between mb-[3rem]">
            <TabLightV2 onChange={onActiveLoanTypeChange} active={activeLoanType} items={["Personal Loans", "Corporate Loans"]}></TabLightV2>
            <Button
              onClick={() => {
                openModal("EligibilityPopUp");
              }}
              sx={{ maxWidth: "18.3rem" }}
            >
              Check Eligibility
            </Button>
          </div>

          <TabLight onChange={onLoanTypeChange} active={activeTab} items={tabs}></TabLight>
          {(!filteredLoans || filteredLoans?.length < 1) && (
            <EmptyState className={"min-h-[75vh]"} caption={`No ${activeTab?.includes("All") ? "" : activeTab?.split(" ")[0] ?? ""} loan.`} img={"/empty-savings.png"}></EmptyState>
          )}
          {filteredLoans && filteredLoans?.length > 0 && (
            <div className="mt-[3.2rem] grid grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-[1.6rem]">
              {filteredLoans?.map((loan, i) => {
                return <LoanCard loan={loan} key={i}></LoanCard>;
              })}
            </div>
          )}
        </MobileContainer>
      </AppLayout>
    </>
  );
};

export default Loan;
