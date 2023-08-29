"use client";

import type { NextPage } from "next";

const GameMatchMakingChildPage: NextPage = () => {
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
      <div className="absolute top-[343px] left-[527px] bg-darkslategray-100 w-[390px] h-[338px] overflow-hidden text-5xl">
        <div className="absolute top-[30px] left-[27px] tracking-[0.1em]">
          Match making
        </div>
        <div className="absolute top-[104px] left-[57px] tracking-[0.1em] inline-block w-[314px]">
          <p className="m-0">waiting for opponent</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">setting up the game</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">settings...</p>
        </div>
      </div>
    </div>
  );
};

export default GameMatchMakingChildPage;
