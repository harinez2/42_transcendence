"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

type MChatChannelOpsType = {
  onClose?: () => void;
};

const MChatChannelOps: NextPage<MChatChannelOpsType> = ({ onClose }) => {
  const router = useRouter();

  const onChannelOpsSetClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const onAddAdminClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="relative h-[485px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[41px] top-[38px] tracking-[0.1em]">
        Channel ops
      </div>
      <button className="absolute left-[59px] top-[102px] h-[41px] w-[67px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[67px] rounded-8xs"
          alt=""
          src="/rectangle-129.svg"
        />
        <div className="absolute left-[9px] top-[7px] inline-block h-[34px] w-14 text-left font-body text-5xl tracking-[0.1em] text-base-white">
          kick
        </div>
      </button>
      <button className="absolute left-[158px] top-[102px] h-[41px] w-[67px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[67px] rounded-8xs"
          alt=""
          src="/rectangle-129.svg"
        />
        <div className="absolute left-[11px] top-[7px] inline-block h-[34px] w-14 text-left font-body text-5xl tracking-[0.1em] text-base-white">
          ban
        </div>
      </button>
      <button className="absolute left-[257px] top-[102px] h-[41px] w-[73.8px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[73.8px] rounded-8xs"
          alt=""
          src="/rectangle-1210.svg"
        />
        <div className="absolute left-[6px] top-[7px] inline-block h-[34px] w-[65px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          mute
        </div>
      </button>
      <TextField
        className="absolute left-[75px] top-[165px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Limited hours"
        label="Limited hours"
        size="medium"
        margin="none"
      />

      <button
        className="absolute left-[75px] top-[230px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onChannelOpsSetClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[98.74px] top-[7px] inline-block h-[34px] w-[53.17px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Set
        </div>
      </button>
      <TextField
        className="absolute left-[75px] top-[280px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="User name"
        label="User name"
        size="medium"
        margin="none"
      />
      <button
        className="absolute left-[75px] top-[399px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onAddAdminClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[186px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Add admin
        </div>
      </button>
    </div>
  );
};

export default MChatChannelOps;
