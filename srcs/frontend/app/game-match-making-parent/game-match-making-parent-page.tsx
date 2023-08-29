"use client";

import React from 'react';
import type { NextPage } from "next";
import MatchMakingContainer from "../components/match-making-container";

const GameMatchMakingParentPage: NextPage = () => {
  return (
    <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-29xl text-base-white font-body">
      <div className="absolute top-[9px] left-[70px] w-[1301px] h-[1092px] text-181xl font-geo">
        <div className="absolute top-[0px] left-[643px] text-17xl tracking-[0.1em] font-body">
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">|</p>
          <p className="m-0">&nbsp;</p>
        </div>
        <div className="absolute top-[21px] left-[261px] tracking-[0.1em] mix-blend-color-dodge">
          4
        </div>
        <div className="absolute top-[32px] left-[962px] tracking-[0.1em] mix-blend-color-dodge">
          2
        </div>
        <div className="absolute top-[747px] left-[0px] bg-base-white w-[27px] h-[162px]" />
        <div className="absolute top-[310px] left-[1274px] bg-base-white w-[27px] h-[162px]" />
        <div className="absolute top-[579px] left-[886px] bg-base-white w-[30px] h-[30px]" />
      </div>
      <div className="absolute top-[15px] left-[538px] tracking-[0.1em] inline-block w-[149px] h-14">
        user1
      </div>
      <div className="absolute top-[15px] left-[763px] tracking-[0.1em] inline-block w-[149px] h-14">
        user2
      </div>
      <div className="absolute top-[0px] left-[2px] bg-gray-600 opacity-50 w-full h-screen overflow-hidden" />
      <MatchMakingContainer />
    </div>
  );
};

export default GameMatchMakingParentPage;
