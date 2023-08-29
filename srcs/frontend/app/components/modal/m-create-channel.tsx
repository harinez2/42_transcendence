import type { NextPage } from "next";
import { TextField, FormControlLabel, Switch } from "@mui/material";

type MCreateChannelType = {
  onClose?: () => void;
};

const MCreateChannel: NextPage<MCreateChannelType> = ({ onClose }) => {
  return (
    <div className="relative bg-darkslategray-100 w-[390px] h-[410px] overflow-hidden max-w-full max-h-full text-left text-xl text-base-white font-body">
      <div className="absolute top-[36px] left-[29px] text-5xl tracking-[0.1em]">
        Create Channel
      </div>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[85px] left-[63px]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Channel name"
        label="Channel name"
        size="medium"
        margin="none"
      />
      <div className="absolute top-[156px] left-[63px] tracking-[0.1em]">
        Private
      </div>
      <div className="absolute top-[203px] left-[62px] tracking-[0.1em]">
        Password
      </div>
      <FormControlLabel
        className="absolute top-[156px] left-[248px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <FormControlLabel
        className="absolute top-[199px] left-[247px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <TextField
        className="[border:none] bg-[transparent] absolute top-[250px] left-[62px]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
      />
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[322px] left-[62px] w-[242px] h-[41px]">
        <img
          className="absolute top-[0px] left-[0px] w-[242px] h-[41px]"
          alt=""
          src="/rectangle-126.svg"
        />
        <div className="absolute top-[7px] left-[26.7px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[203.07px] h-[34px]">
          Create channel
        </div>
      </button>
    </div>
  );
};

export default MCreateChannel;
