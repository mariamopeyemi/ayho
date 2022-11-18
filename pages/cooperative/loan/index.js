import { useRouter } from "next/router";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import AppLayout from "../../../components/layouts/AppLayout";
import LoanManager from "../../../components/pages/loan/Manager";
import MyLoan from "../../../components/pages/loan/LoanPage/MyLoan";
import ApplyLoanPopUp from "../../../components/modal/loan/ApplyLoanPopUp";
import PersonalLoan from "../../../components/pages/loan/LoanPage/PersonalLoan";
import CorperateLoan from "../../../components/pages/loan/LoanPage/CorperateLoan";


const LOANS = [
  {title:"All (2000)", id:"ALL_LOAN"},
  {title:"Pending (400)", id:"PENDING_LOAN"},
  {title:"Approved (200)", id:"APPROVED_LOAN"},
  {title:"Declined (1400)", id:"DECLINED_LOAN"},
  
]
// const tabs = [
//   `All (${filterLoans("All")?.length || 0})`,
//   `Pending (${filterLoans("pending")?.length || 0})`,
//   `Active (${filterLoans("active")?.length || 0})`,
//   `Declined (${filterLoans("declined")?.length || 0})`,
//   `Completed (${filterLoans("completed")?.length || 0})`,
// ];
const LoanPage = () => {
  const router = useRouter();
  const [activeTable, setActiveTable] = useState("Personal Loans");
  const [activeModal, setActiveModal] = useState(false);
  const [loanSummary, setLoanSummary] = useState({});
  return (
    <AppLayout>
      {/* { member type Modal */}
      {/* { memberType && <MemberTypeModal
          toggle={()=>setMemberType(false)}
          open={()=>setMemberType(true)} 
          existingMember={viewExistingMember}
          newMember={viewNewMember}
         />} */}
      {/* <Dialog scroll="body" onClose={handleClose} open={open}> */}
        {/* {activeModal == "EligibilityPopUp" && <EligibilityPopUp onApply={onApply}></EligibilityPopUp>} */}
        {/* {activeModal && <ApplyLoanPopUp loanDetails={loanSummary} onApplyLoan={onApplyLoan}></ApplyLoanPopUp>} */}
        {activeModal && <ApplyLoanPopUp loanDetails={loanSummary} 
        
        onClose={()=>setActiveModal(false)}
        open={()=>setActiveModal(true)} 
        ></ApplyLoanPopUp>}
        {/* {activeModal == "LoanSummaryPopUp" && <LoanSummaryPopUp loanSummary={loanSummary} onReadSummary={onReadSummary} onGoBack={onGoBackToLoan} onClose={handleClose}></LoanSummaryPopUp>}
        {activeModal == "EnterPinTopup" && <EnterPinPopUp onAction={onEnterPin} actionText={"Apply"}></EnterPinPopUp>}
        {activeModal == "SuccessTopup" && <SuccessPopUp onAction={handleClose} actionText={"Ok"} caption={"Application successfully sent and waiting approval."}></SuccessPopUp>} */}
      {/* </Dialog> */}
        <div className="flex flex-row justify-between">
        <LoanManager
                handleChange={(item) => {
                setActiveTable(item);
                }}
                items={["Personal Loans", "Corporate Loans", "My Loans"]}
            ></LoanManager>
          <div className="w-[200px] ">
            <LoadingButton
                onClick={setActiveModal}
                // loading={loading}
                variant="contained"
              >
                Apply
              </LoadingButton>
          </div>
        </div>
            {activeTable == "Personal Loans" && < PersonalLoan />}
            {activeTable == "Corporate Loans" && <CorperateLoan />}
            {activeTable == "My Loans" && <MyLoan />}
     
    </AppLayout>
  );
};

export default LoanPage;