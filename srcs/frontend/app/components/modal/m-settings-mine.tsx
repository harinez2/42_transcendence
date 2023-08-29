import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MSettingsMineType = {
  onClose?: () => void;
};

const MSettingsMine: NextPage<MSettingsMineType> = ({ onClose }) => {
  return (
    <div className="relative bg-darkslategray-100 w-[390px] h-[448px] overflow-hidden max-w-full max-h-full text-left text-5xl text-base-white font-body">
      <div className="absolute top-[30px] left-[27px] tracking-[0.1em]">
        My settings
      </div>
      <img
        className="absolute h-[10.04%] w-[11.54%] top-[22.32%] right-[71.03%] bottom-[67.63%] left-[17.44%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/icon1.svg"
      />
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[105px] left-[134px] w-[187px] h-10">
        <img
          className="absolute top-[0px] left-[0px] w-[187px] h-10"
          alt=""
          src="/rectangle-1213.svg"
        />
        <div className="absolute top-[9px] left-[18px] text-xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[156px]">
          Upload avator
        </div>
      </button>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[195px] left-[68px]"
        sx={{ width: 254 }}
        color="info"
        variant="filled"
        type="text"
        name="User name"
        label="User name"
        size="medium"
        margin="none"
      />
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[262px] left-[68px] w-[253.83px] h-[41px]">
        <img
          className="absolute top-[0px] left-[0px] w-[253.83px] h-[41px]"
          alt=""
          src="/rectangle-127.svg"
        />
        <div className="absolute top-[9px] left-[22px] text-xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[218px] h-8">
          Change User name
        </div>
      </button>

      <div className="absolute top-[359px] left-[75px] text-xl tracking-[0.1em] inline-block w-52 h-[33.26px]">
        two-factor authentication
      </div>
      <FormControlLabel
        className="absolute top-[365px] left-[266px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
    </div>
  );
};

export default MSettingsMine;
