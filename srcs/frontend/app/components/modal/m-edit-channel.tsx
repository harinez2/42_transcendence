import React from "react";
import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MEditChannelType = {
  onClose?: () => void;
};

const MEditChannel: NextPage<MEditChannelType> = ({ onClose }) => {
  return (
    <div className="relative h-[505px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
      <div className="absolute left-[27px] top-[30px] text-5xl tracking-[0.1em]">
        Edit Channel
      </div>
      <TextField
        className="absolute left-[72px] top-[80px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Channel name"
        label="Channel name"
        size="medium"
        margin="none"
      />
      <div className="absolute left-[75px] top-[151px] tracking-[0.1em]">
        Private
      </div>
      <div className="absolute left-[74px] top-[198px] tracking-[0.1em]">
        Password
      </div>
      <FormControlLabel
        className="absolute left-[260px] top-[151px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <FormControlLabel
        className="absolute left-[259px] top-[194px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <TextField
        className="absolute left-[72px] top-[245px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
      />
      <button className="absolute left-[74px] top-[317px] h-[43px] w-[242px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[242px]"
          alt=""
          src="/rectangle-126.svg"
        />
        <div className="absolute left-[38.7px] top-[7px] inline-block h-[34px] w-[203.07px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Edit channel
        </div>
      </button>
      <button className="absolute left-[72px] top-[423px] h-[43px] w-[242px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[242px]"
          alt=""
          src="/rectangle-1271.svg"
        />
        <div className="absolute left-[30.7px] top-[7px] inline-block h-[34px] w-[203.07px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Delete channel
        </div>
      </button>
    </div>
  );
};

export default MEditChannel;
