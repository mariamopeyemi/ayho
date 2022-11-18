import { Dialog } from "@mui/material";
import React, { useState } from "react";
import formatNumberWithCommas from "../../../../utils/addCommas";
import formatDate from "../../../../utils/formatDate";
import CurrencySymbol from "../../../general/CurrencySymbol";
import SvgIconWrapper from "../../../general/SvgIconWrapper";
import PlainContainer from "../../../layouts/PlainContainer";
import AutoSavePopUp from "../popups/AutoSavePopUp";

const SavingsInfo = ({ saving }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog scroll="body" onClose={handleClose} open={open}>
        <AutoSavePopUp onClose={handleClose}></AutoSavePopUp>
      </Dialog>
      <PlainContainer isStrechedMobile={false} className={" !p-[2.4rem] mb-[1.6rem]"}>
        <header className="flex items-center justify-between mb-[1rem]">
          <h3 className=" text-pv_dark font-medium">Savings Info</h3>
          <span className=" text-text text-[1.4rem] font-semibold">Autosave is {saving?.autoDebit ? "ON" : "OFF"}</span>
        </header>
        <div className={" rounded-secondary p-[1.6rem]  mb-[.8rem] bg-[rgba(58,117,236,0.14)]"}>
          <div className="flex items-center mb-[.8rem] justify-between">
            <span className=" text-[1.4rem] font-medium text-label">AutoSave Deposit</span>
          </div>
          <p className=" font-medium text-[1.6rem] text-pv_dark">
            <CurrencySymbol />
            &nbsp;
            {formatNumberWithCommas(saving?.amountSavedPerTime) || 0}/{saving?.savingFrequency}
          </p>
        </div>
        <div className={" rounded-secondary p-[1.6rem] bg-[rgba(181,72,198,0.14)]"}>
          <div className="flex items-center mb-[.8rem] justify-between">
            <span className=" text-[1.4rem] font-medium text-label">Next Withdrawal</span>
          </div>
          <p className=" font-medium text-[1.6rem] text-pv_dark">{formatDate(saving?.endDate, true)}</p>
        </div>
        <div className=" border-0 border-t border-border border-solid mt-[2rem] pt-[2rem] flex items-center justify-center overflow-scroll scroll_hide">
          <SvgIconWrapper iconName={"power"}></SvgIconWrapper>
          <span
            onClick={() => {
              setOpen(true);
            }}
            className=" text-text font-semibold text-[1.6rem] ml-[.8rem] cursor-pointer"
          >
            Turn {saving?.autoDebit ? "Off" : "On"} Autosave
          </span>
        </div>
      </PlainContainer>
    </>
  );
};

export default SavingsInfo;
