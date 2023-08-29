"use client";

import React from 'react';
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
    <div className="relative bg-darkslategray-100 w-[390px] h-[485px] overflow-hidden max-w-full max-h-full text-left text-5xl text-base-white font-body">
      <div className="absolute top-[38px] left-[41px] tracking-[0.1em]">
        Channel ops
      </div>
           <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[102px] left-[59px] w-[67px] h-[41px]">
        <img
          className="absolute top-[0px] left-[0px] rounded-8xs w-[67px] h-[41px]"
          alt=""
          src="/rectangle-129.svg"
        />
        <div className="absolute top-[7px] left-[9px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-14 h-[34px]">
          kick
        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[102px] left-[158px] w-[67px] h-[41px]">
        <img
          className="absolute top-[0px] left-[0px] rounded-8xs w-[67px] h-[41px]"
          alt=""
          src="/rectangle-129.svg"
        />
        <div className="absolute top-[7px] left-[11px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-14 h-[34px]">
          ban
        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[102px] left-[257px] w-[73.8px] h-[41px]">
        <img
          className="absolute top-[0px] left-[0px] rounded-8xs w-[73.8px] h-[41px]"
          alt=""
          src="/rectangle-1210.svg"
        />
        <div className="absolute top-[7px] left-[6px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[65px] h-[34px]">
          mute
        </div>
      </button>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[165px] left-[75px]"
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
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[230px] left-[75px] w-[241px] h-[41px]"
        onClick={onChannelOpsSetClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[241px] h-[41px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute top-[7px] left-[98.74px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[53.17px] h-[34px]">
          Set
        </div>
      </button>
      <TextField
        className="[border:none] bg-[transparent] absolute top-[280px] left-[75px]"
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
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[399px] left-[75px] w-[241px] h-[41px]"
        onClick={onAddAdminClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[241px] h-[41px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute top-[7px] left-[46px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[186px] h-[34px]">
          Add admin
        </div>
      </button>
 
    </div>
  );
};

export default MChatChannelOps;
