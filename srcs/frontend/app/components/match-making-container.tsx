"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const MatchMakingContainer: NextPage = () => {
  const router = useRouter();

  const onLeaveTheQueueClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="absolute left-[527px] top-[343px] h-[338px] w-[390px] overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[27px] top-[30px] tracking-[0.1em]">
        Match making
      </div>
      <div className="absolute left-[57px] top-[104px] inline-block w-[314px] tracking-[0.1em]">
        waiting for opponent...
      </div>
      <button
        className="absolute left-[68px] top-[252px] h-[41px] w-[253.83px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onLeaveTheQueueClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[253.83px]"
          alt=""
          src="/rectangle-12111.svg"
        />
        <div className="absolute left-[25px] top-[7px] inline-block h-[34px] w-[213px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          leave the queue
        </div>
      </button>
    </div>
  );
};

export default MatchMakingContainer;
