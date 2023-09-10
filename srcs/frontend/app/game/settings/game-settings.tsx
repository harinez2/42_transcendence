import type { NextPage } from "next";
import React from "react";
import GameSettingsContainer from "./game-settings-container";

const GameSettingsPage: NextPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-29xl text-base-white">
      <div className="absolute left-[70px] top-[9px] h-[1092px] w-[1301px] font-geo text-181xl">
        <div className="absolute left-[643px] top-[0px] font-body text-17xl tracking-[0.1em]">
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
        <div className="absolute left-[261px] top-[21px] tracking-[0.1em] mix-blend-color-dodge">
          4
        </div>
        <div className="absolute left-[962px] top-[32px] tracking-[0.1em] mix-blend-color-dodge">
          2
        </div>
        <div className="absolute left-[0px] top-[747px] h-[162px] w-[27px] bg-base-white" />
        <div className="absolute left-[1274px] top-[310px] h-[162px] w-[27px] bg-base-white" />
        <div className="absolute left-[886px] top-[579px] h-[30px] w-[30px] bg-base-white" />
      </div>
      <div className="absolute left-[538px] top-[15px] inline-block h-14 w-[149px] tracking-[0.1em]">
        user1
      </div>
      <div className="absolute left-[763px] top-[15px] inline-block h-14 w-[149px] tracking-[0.1em]">
        user2
      </div>
      <div className="absolute left-[2px] top-[0px] h-screen w-full overflow-hidden bg-gray-600 bg-opacity-50">
        <GameSettingsContainer />
      </div>
    </div>
  );
};

export default GameSettingsPage;
