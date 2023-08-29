"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { FormControlLabel, Switch, Box, Slider } from "@mui/material";
import { useRouter } from "next/navigation";

const GameSettingsContainer: NextPage = () => {
  const router = useRouter();

  const onSignInClick = useCallback(() => {
    router.push("/../pages/game-match-making-child");
  }, [router]);

  const onRectangleClick = useCallback(() => {
    router.push("/../pages/game-match-making-child");
  }, [router]);

  return (
    <div className="absolute top-[280px] left-[525px] bg-darkslategray-100 w-[390px] h-[391px] overflow-hidden text-left text-5xl text-base-white font-body">
      <div className="absolute top-[30px] left-[27px] tracking-[0.1em]">
        Game settings
      </div>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[313px] left-[79px] w-[223.67px] h-[41px]"
        onClick={onSignInClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[223.67px] h-[41px] cursor-pointer"
          alt=""
          src="/rectangle-1251.svg"
          onClick={onRectangleClick}
        />
        <div className="absolute top-[7px] left-[84px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[114px] h-[34px]">
          Play
        </div>
      </button>
      <FormControlLabel
        className="absolute top-[239px] left-[251px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <div className="absolute top-[238px] left-[81px] tracking-[0.1em]">
        Speed up
      </div>
      <div className="absolute top-[89px] left-[79px] tracking-[0.1em]">
        Points
      </div>
      <Box className="absolute top-[169px] left-[71px]" sx={{ width: 237 }}>
        <Slider
          color="primary"
          min={3}
          max={7}
          orientation="horizontal"
          step={2}
          marks
        />
      </Box>
      <div className="absolute top-[139px] left-[66px] w-[242px] h-4 text-xl">
        <div className="absolute top-[0px] left-[0px] tracking-[0.1em] inline-block w-[8.26px]">
          3
        </div>
        <div className="absolute top-[0px] left-[112.15px] tracking-[0.1em] inline-block w-[8.26px]">
          5
        </div>
        <div className="absolute top-[0px] left-[233.74px] tracking-[0.1em] inline-block w-[8.26px]">
          7
        </div>
      </div>
    </div>
  );
};

export default GameSettingsContainer;
