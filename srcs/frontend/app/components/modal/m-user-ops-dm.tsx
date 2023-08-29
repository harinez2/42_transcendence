"use client";

import React from 'react';
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type MUserOpsDMType = {
  onClose?: () => void;
};

const MUserOpsDM: NextPage<MUserOpsDMType> = ({ onClose }) => {
  const router = useRouter();

  const onSeeProfileClick = useCallback(() => {
    router.push("/../profile-other");
  }, [router]);

  const onInviteToGameClick = useCallback(() => {
    router.push("/../game-settings");
  }, [router]);

  return (
    <div className="relative bg-darkslategray-100 w-[390px] h-[337px] overflow-hidden max-w-full max-h-full text-left text-5xl text-base-white font-body">
      <div className="absolute top-[34px] left-[42px] tracking-[0.1em]">
        user ops
      </div>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[89px] left-[42px] w-[174px] h-[43px]"
        onClick={onSeeProfileClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[174px] h-[41px]"
          alt=""
          src="/rectangle-1221.svg"
        />
        <div className="absolute top-[9px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[142px] h-[34px]">
          See Profile
        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[168px] left-[42px] w-44 h-[42px]">
        <img
          className="absolute top-[0px] left-[0px] w-44 h-[41px]"
          alt=""
          src="/rectangle-1231.svg"
        />
        <div className="absolute top-[8px] left-[23.9px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[147.1px] h-[34px]">
          Add friend
        </div>
      </button>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[242px] left-[42px] w-[272px] h-[42px]"
        onClick={onInviteToGameClick }
      >
        <img
          className="absolute top-[0px] left-[0px] w-[272px] h-[41px]"
          alt=""
          src="/rectangle-124.svg"
        />
        <div className="absolute top-[8px] left-[24px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[248px] h-[34px]">
          Invite to Game
        </div>
      </button>
    </div>
  );
};

export default MUserOpsDM;
