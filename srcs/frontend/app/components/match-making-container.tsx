"use client";

import React from 'react';
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const MatchMakingContainer: NextPage = () => {
  const router = useRouter();

  const onLeaveTheQueueClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="absolute top-[343px] left-[527px] bg-darkslategray-100 w-[390px] h-[338px] overflow-hidden text-left text-5xl text-base-white font-body">
      <div className="absolute top-[30px] left-[27px] tracking-[0.1em]">
        Match making
      </div>
      <div className="absolute top-[104px] left-[57px] tracking-[0.1em] inline-block w-[314px]">
        waiting for opponent...
      </div>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[252px] left-[68px] w-[253.83px] h-[41px]"
        onClick={onLeaveTheQueueClick }
      >
        <img
          className="absolute top-[0px] left-[0px] w-[253.83px] h-[41px]"
          alt=""
          src="/rectangle-12111.svg"
        />
        <div className="absolute top-[7px] left-[25px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[213px] h-[34px]">
          leave the queue
        </div>
      </button>
    </div>
  );
};

export default MatchMakingContainer;
