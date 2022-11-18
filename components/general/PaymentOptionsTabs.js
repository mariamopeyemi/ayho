import React, { useState } from "react";
import PLVRadio from "../form-elements/PLVRadio";
import Hrule from "./Hrule";
import SvgIconWrapper from "./SvgIconWrapper";
import TabFilled from "./TabFilled";

const PaymentOptionsTabs = ({ activePaymentType, onSelect = (type, data) => {}, onOpenAddCard = () => {} }) => {
  const paymentTypes = ["Wallet", "Bank cards", "Transfer"];
  const [activeCard, setActiveCard] = useState(0);
  const [paymentType, setPaymentType] = useState(activePaymentType ?? "Wallet");
  return (
    <div>
      <TabFilled
        label={"Payment option"}
        onChange={(item) => {
          setPaymentType(item);
        }}
        active={paymentType}
        items={paymentTypes}
      ></TabFilled>

      {paymentType == "Bank cards" && (
        <>
          <Hrule className={" my-[2.4rem]"}></Hrule>

          {[0, 1].map((el, i) => {
            return (
              <div key={i}>
                <div
                  onClick={() => {
                    setActiveCard(i);
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <PLVRadio isChecked={activeCard == i} name="card"></PLVRadio>
                  <span className=" text-label text-[1.4rem] font-medium ml-[1.6rem]">{"Use bank card *******2342"}</span>
                </div>
                <Hrule className={"my-[1.8rem] "}></Hrule>
              </div>
            );
          })}

          <p onClick={onOpenAddCard} className="text-label text-[1.6rem] font-medium flex items-center cursor-pointer">
            <SvgIconWrapper className={"w-[2rem] h-[2rem]"} iconName={"box-plus"}></SvgIconWrapper>
            <span className="ml-[1.6rem]">Add bank card</span>
          </p>
        </>
      )}
      {paymentType == "Transfer" && (
        <>
          <Hrule className={" my-[2.4rem]"}></Hrule>
          <div className="grid justify-center items-center place-content-center place-items-center mt-[2rem]">
            <p className=" text-pv_dark text-[1.6rem] font-medium">Zenith Bank</p>
            <h3 className=" text-[3rem] text-pv_dark font-semibold mt-[4px] mb-[12px] leading-[24px]">N300,000</h3>
            <div className="h-[31px] rounded-full bg-[#dfe2e68a] px-[15px] flex items-center cursor-pointer">
              <SvgIconWrapper className={"!w-6 !h-6 mr-[8px]"} iconName={"copy-filled-green"}></SvgIconWrapper>
              <span className=" text-[1.6rem] leading-[24px] text-pv_dark font-medium">74653827773</span>
            </div>
            <p className="max-w-[324px] mb-[3rem] mt-[1.4rem] text-pv_dark opacity-[.6] leading-[20px] text-center text-[14px]">
              Transfer this amount into this account number via your mobile banking platform.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentOptionsTabs;
