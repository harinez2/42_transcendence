"use client";

import type { NextPage } from "next";

const RankingContainer: NextPage = () => {

  return (
    <div className="absolute top-[506px] left-[590px] w-[229px] h-[227px]">
     <div className="absolute top-[0px] left-[1px] w-[228px] h-14 overflow-hidden flex flex-row items-center justify-start gap-[66px]">
      <div className="relative tracking-[0.1em]">
      ranking
      </div>
        <div className="relative text-29xl tracking-[0.1em]">
        1/5
        </div>
     </div>
     <div className="absolute top-[83px] left-[5px] w-[212px] h-14 overflow-hidden flex flex-row items-center justify-start gap-[118px]">
      <div className="relative tracking-[0.1em]">win</div>
      <div className="relative text-29xl tracking-[0.1em]">
      12
      </div>
     </div>
     <div className="absolute top-[171px] left-[0px] w-[201px] h-14 overflow-hidden flex flex-row items-center justify-start gap-[130px]">
      <div className="tracking-[0.1em] inline-block w-[34px] mb-[11px]">
      lose
      </div>
      <div className="relative text-29xl tracking-[0.1em]">
      3
      </div>
     </div>
    </div>
  );
};

export default RankingContainer;
