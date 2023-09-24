"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type MUserOpsDMType = {
  onClose?: () => void;
};

const MUserOpsDM: NextPage<MUserOpsDMType> = ({ onClose }) => {
  // eslint-disable-line no-unused-vars
  const router = useRouter();

  const onSeeProfileClick = useCallback(() => {
    router.push("/../profile/other");
  }, [router]);

  const onInviteToGameClick = useCallback(() => {
    router.push("/../game/settings");
  }, [router]);

  return (
    <div className="relative h-[337px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[42px] top-[34px] tracking-[0.1em]">
        user ops
      </div>
      <button
        className="absolute left-[42px] top-[89px] h-[43px] w-[174px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onSeeProfileClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[174px]"
          alt=""
          src="/rectangle-1221.svg"
        />
        <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[142px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          See Profile
        </div>
      </button>
      <button className="absolute left-[42px] top-[168px] h-[42px] w-44 cursor-pointer bg-[transparent] p-0 [border:none]">
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-44"
          alt=""
          src="/rectangle-1231.svg"
        />
        <div className="absolute left-[23.9px] top-[8px] inline-block h-[34px] w-[147.1px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Add friend
        </div>
      </button>
      <button
        className="absolute left-[42px] top-[242px] h-[42px] w-[272px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onInviteToGameClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
          alt=""
          src="/rectangle-124.svg"
        />
        <div className="absolute left-[24px] top-[8px] inline-block h-[34px] w-[248px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Invite to Game
        </div>
      </button>
    </div>
  );
};

export default MUserOpsDM;
