import { InputAdornment, TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import SvgIconWrapper from "../general/SvgIconWrapper";

const PLVMobileDateTimePicker = () => {
  const [value, setValue] = React.useState(new Date(Date.now()));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDateTimePicker
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            InputProps={{
              id: "date-time-picker",
              endAdornment: (
                <InputAdornment position="end">
                  <label className="p-[8px]" htmlFor="date-time-picker">
                    {" "}
                    <SvgIconWrapper className={" !text-pv_primary cursor-pointer mt-3 mr-[-12px] "} iconName={"calendar"}></SvgIconWrapper>
                  </label>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default PLVMobileDateTimePicker;
