"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

type MJoinChannelPasswordType = {
  onClose?: () => void;
};

const MJoinChannelPassword: NextPage<MJoinChannelPasswordType> = ({
  onClose, // eslint-disable-line no-unused-vars
}) => {
  const router = useRouter();

  const onJoinChannelClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
        channel name
      </div>
      <TextField
        className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
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
        className="absolute left-[75px] top-[181px] h-[42px] w-[222px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onJoinChannelClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[240.84px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute left-[43px] top-[8px] inline-block h-[34px] w-[171px] text-left font-body text-5xl tracking-[0.1em] text-base-white">{`Join channel `}</div>
      </button>
    </div>
  );
};

export default MJoinChannelPassword;
