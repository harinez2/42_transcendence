import React from "react";
import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MSettingsMineType = {
  onClose?: () => void;
};

// eslint-disable-next-line no-unused-vars
const MSettingsMine: NextPage<MSettingsMineType> = ({ onClose }) => {
  return (
    <div className="relative h-[448px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[27px] top-[30px] tracking-[0.1em]">
        My settings
      </div>
      <img
        className="absolute bottom-[67.63%] left-[17.44%] right-[71.03%] top-[22.32%] h-[10.04%] max-h-full w-[11.54%] max-w-full overflow-hidden"
        alt=""
        src="/icon1.svg"
      />
      <button className="absolute left-[134px] top-[105px] h-10 w-[187px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-10 w-[187px]"
          alt=""
          src="/rectangle-1213.svg"
        />
        <div className="absolute left-[18px] top-[9px] inline-block w-[156px] text-left font-body text-xl tracking-[0.1em] text-base-white">
          Upload avator
        </div>
      </button>
      <TextField
        className="absolute left-[68px] top-[195px] bg-[transparent] [border:none]"
        sx={{ width: 254 }}
        color="info"
        variant="filled"
        type="text"
        name="User name"
        label="User name"
        size="medium"
        margin="none"
      />
      <button className="absolute left-[68px] top-[262px] h-[41px] w-[253.83px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[253.83px]"
          alt=""
          src="/rectangle-127.svg"
        />
        <div className="absolute left-[22px] top-[9px] inline-block h-8 w-[218px] text-left font-body text-xl tracking-[0.1em] text-base-white">
          Change User name
        </div>
      </button>

      <div className="absolute left-[75px] top-[359px] inline-block h-[33.26px] w-52 text-xl tracking-[0.1em]">
        two-factor authentication
      </div>
      <FormControlLabel
        className="absolute left-[266px] top-[365px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
    </div>
  );
};

export default MSettingsMine;
