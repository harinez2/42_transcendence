import React from 'react';
import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MEditChannelType = {
  onClose?: () => void;
};

const MEditChannel: NextPage<MEditChannelType> = ({ onClose }) => {
  return (
    <div className="relative bg-darkslategray-100 w-[390px] h-[505px] overflow-hidden max-w-full max-h-full text-left text-xl text-base-white font-body">
      <div className="absolute top-[30px] left-[27px] text-5xl tracking-[0.1em]">
        Edit Channel
      </div>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[80px] left-[72px]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Channel name"
        label="Channel name"
        size="medium"
        margin="none"
      />
      <div className="absolute top-[151px] left-[75px] tracking-[0.1em]">
        Private
      </div>
      <div className="absolute top-[198px] left-[74px] tracking-[0.1em]">
        Password
      </div>
      <FormControlLabel
        className="absolute top-[151px] left-[260px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <FormControlLabel
        className="absolute top-[194px] left-[259px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <TextField
        className="[border:none] bg-[transparent] absolute top-[245px] left-[72px]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
      />
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[317px] left-[74px] w-[242px] h-[43px]">
        <img
          className="absolute top-[0px] left-[0px] w-[242px] h-[41px]"
          alt=""
          src="/rectangle-126.svg"
        />
        <div className="absolute top-[7px] left-[38.7px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[203.07px] h-[34px]">
          Edit channel
        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[423px] left-[72px] w-[242px] h-[43px]">
        <img
          className="absolute top-[0px] left-[0px] w-[242px] h-[41px]"
          alt=""
          src="/rectangle-1271.svg"
        />
        <div className="absolute top-[7px] left-[30.7px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[203.07px] h-[34px]">
          Delete channel
        </div>
      </button>
    </div>
  );
};

export default MEditChannel;
