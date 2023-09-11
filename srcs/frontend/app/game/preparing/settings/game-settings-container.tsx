"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { FormControlLabel, Switch, Box, Slider } from "@mui/material";
import { useRouter } from "next/navigation";

const GameSettingsContainer: NextPage = () => {
  const router = useRouter();

  const onPlayClick = useCallback(() => {
    router.push("../match-making-parent");
  }, [router]);

  return (
    <div className="absolute left-[525px] top-[280px] h-[391px] w-[390px] overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[27px] top-[30px] tracking-[0.1em]">
        Game settings
      </div>
      <button
        className="absolute left-[79px] top-[313px] h-[41px] w-[223.67px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onPlayClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[223.67px] cursor-pointer"
          alt=""
          src="/rectangle-1251.svg"
        />
        <div className="absolute left-[84px] top-[7px] inline-block h-[34px] w-[114px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Play
        </div>
      </button>
      <FormControlLabel
        className="absolute left-[251px] top-[239px]"
        label=""
        control={<Switch color="info" size="medium" />}
      />
      <div className="absolute left-[81px] top-[238px] tracking-[0.1em]">
        Speed up
      </div>
      <div className="absolute left-[79px] top-[89px] tracking-[0.1em]">
        Points
      </div>
      <Box className="absolute left-[71px] top-[169px]" sx={{ width: 237 }}>
        <Slider
          color="primary"
          min={3}
          max={7}
          orientation="horizontal"
          step={2}
          marks
        />
      </Box>
      <div className="absolute left-[66px] top-[139px] h-4 w-[242px] text-xl">
        <div className="absolute left-[0px] top-[0px] inline-block w-[8.26px] tracking-[0.1em]">
          3
        </div>
        <div className="absolute left-[112.15px] top-[0px] inline-block w-[8.26px] tracking-[0.1em]">
          5
        </div>
        <div className="absolute left-[233.74px] top-[0px] inline-block w-[8.26px] tracking-[0.1em]">
          7
        </div>
      </div>
    </div>
  );
};

export default GameSettingsContainer;
