import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import PLVDesktopDatePicker from "../../../form-elements/PLVDesktopDatePicker";
import PLVMobileDateTimePicker from "../../../form-elements/PLVMobileDateTimePicker";
import PLVRadio from "../../../form-elements/PLVRadio";
import Hrule from "../../../general/Hrule";
import SvgIconWrapper from "../../../general/SvgIconWrapper";
import TabFilled from "../../../general/TabFilled";
import PopupLayout from "../../../layouts/PopupLayout";

const AutoSavePopUp = ({ onAction = () => {}, onClose = () => {}, onOpenAddCard = () => {} }) => {
  const autoSaveTypes = ["Daily", "Weekly", "Monthly"];
  const [autoSaveType, setAutoSaveType] = useState("Weekly");
  return (
    <PopupLayout onClose={onClose} title="Set AutoSave">
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">&#8358;</InputAdornment>,
          // sx: { "&.MuiFilledInput-input": { paddingLeft: "0" } },
        }}
        name="Amount"
        type={"tel"}
        id="Amount to save per time"
        label="Amount"
        variant="filled"
      />
      <span className=" mt-[2.4rem] mb-[1.6rem] text-label flex">How will you prefer to save</span>
      <TabFilled
        className={"mb-[1.6rem]"}
        onChange={(item) => {
          setAutoSaveType(item);
        }}
        active={autoSaveType}
        items={autoSaveTypes}
      ></TabFilled>
      {/* <PLVDesktopDatePicker label="Select debit date"></PLVDesktopDatePicker> */}
      <PLVMobileDateTimePicker label="Select debit date"></PLVMobileDateTimePicker>

      <Button
        onClick={() => {
          onAction();
        }}
        sx={{ mt: 5 }}
      >
        Save
      </Button>
    </PopupLayout>
  );
};

export default AutoSavePopUp;
