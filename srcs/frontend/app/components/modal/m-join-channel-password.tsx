"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

type MJoinChannelPasswordType = {
  onClose?: () => void;
};

const MJoinChannelPassword: NextPage<MJoinChannelPasswordType> = ({
  onClose,
}) => {
  const router = useRouter();

  const onJoinChannelClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="relative bg-darkslategray-100 w-[390px] h-[280px] overflow-hidden max-w-full max-h-full text-left text-5xl text-base-white font-body">
      <div className="absolute top-[50px] left-[32px] tracking-[0.1em]">
        channel name
      </div>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[116px] left-[75px]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
      />
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[181px] left-[75px] w-[222px] h-[42px]"
        onClick={onJoinChannelClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[240.84px] h-[41px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute top-[8px] left-[43px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[171px] h-[34px]">{`Join channel `}</div>
      </button>
    </div>
  );
};

export default MJoinChannelPassword;
