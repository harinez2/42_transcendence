"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "@/app/chat/user";

type MChatChannelOpsType = {
  onClose?: () => void;
  user: UserProps['user'];
};

export const MChatChannelOps: NextPage<MChatChannelOpsType> = (params) => {
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
        Channel ops for {params.user.nickname}
      </div>

      <button
        className="absolute left-[59px] top-[102px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onAddAdminClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[186px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Kick
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[202px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onAddAdminClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[186px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Ban
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[302px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onAddAdminClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[186px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Mute 5 mins
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[400px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
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
