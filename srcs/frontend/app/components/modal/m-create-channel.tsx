import React from "react";
import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MCreateChannelType = {
  onClose?: () => void;
};

const MCreateChannel: NextPage<MCreateChannelType> = ({ onClose }) => {
  return (
    <div className="relative h-[410px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
      <div className="absolute left-[29px] top-[36px] text-5xl tracking-[0.1em]">
        Create Channel
      </div>
      <TextField
        className="absolute left-[63px] top-[85px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Channel name"
        label="Channel name"
        size="medium"
        margin="none"
      />
      <div className="absolute left-[63px] top-[156px] tracking-[0.1em]">
        Private
      </div>
      <div className="absolute left-[62px] top-[203px] tracking-[0.1em]">
        Password
      </div>
      <FormControlLabel
        className="absolute left-[248px] top-[156px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <FormControlLabel
        className="absolute left-[247px] top-[199px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <TextField
        className="absolute left-[62px] top-[250px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
      />
      <button className="absolute left-[62px] top-[322px] h-[41px] w-[242px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[242px]"
          alt=""
          src="/rectangle-126.svg"
        />
        <div className="absolute left-[26.7px] top-[7px] inline-block h-[34px] w-[203.07px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Create channel
        </div>
      </button>
    </div>
  );
};

export default MCreateChannel;
