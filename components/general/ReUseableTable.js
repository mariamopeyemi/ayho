import React from "react";
import Label from "./Label";

const ReUseableTable = ({
  headers = ["Transaction ID", "Date", "Amount", "Type", "Status", "Action"],
  rows = [
    { name: "284738438958485", date: "22/09/2021 , 12:00am", amount: "N40,000", type: "Debit", status: "active", action: "View" },
    { name: "284738438958485", date: "22/09/2021 , 12:00am", amount: "N40,000", type: "Debit", status: "warn", action: "View" },
  ],
  totalPage,
  className,
}) => {
  const colStyle = { gridTemplateColumns: `repeat(${headers?.length}, minmax(0, 1fr))` };
  return (
    <div className={`bg-white rounded-secondary p-[2.8rem] px-[2rem] ${className}`}>
      {/* Header */}
      <header style={{ ...colStyle }} className="grid items-center justify-items-center px-[1.4rem] mb-[1.6rem]">
        {headers?.map((item, i) => {
          return (
            <span className="text-[1.6rem] font-rubik text-text font-medium first:justify-self-start" key={i}>
              {item}
            </span>
          );
        })}
      </header>
      {/* Body */}
      <div className="grid gap-[1.6rem]">
        {rows.map((row, i) => {
          return (
            <div key={i} style={{ ...colStyle }} className=" rounded-secondary grid items-center border-border border border-solid h-[51px] px-[1.4rem] justify-items-center ">
              {Object.entries(row).map(([key, value], i) => {
                if (key == "status") {
                  return (
                    <div key={i} className="first:justify-self-start">
                      <Label type={value}>{value}</Label>
                    </div>
                  );
                } else if (key == "action") {
                  return (
                    <span key={i} className="text-[1.4rem] text-pv_primary  underline-offset-4 underline first:justify-self-start cursor-pointer">
                      {value}
                    </span>
                  );
                } else {
                  return (
                    <span key={i} className="text-[1.4rem] text-text first:justify-self-start">
                      {value}
                    </span>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <footer className="flex justify-between items-center text-text font-medium text-[1.4rem] mt-[2.6rem]">
        <div>Rows per page: 10</div>
        <div>
          <span>1 of 26</span>
        </div>
      </footer>
    </div>
  );
};

export default ReUseableTable;
