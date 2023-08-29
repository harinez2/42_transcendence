"use client";

import React from 'react';
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import MUserOpsDM from "./modal/m-user-ops-dm";
import ModalPopup from "./modal/modal-popup";

const MatchHistoryContainer: NextPage = () => {
    const [isMUserOpsDMOpen, setMUserOpsDMOpen] = useState(false);
    
      const openMUserOpsDM = useCallback(() => {
    setMUserOpsDMOpen(true);
  }, []);

  const closeMUserOpsDM = useCallback(() => {
    setMUserOpsDMOpen(false);
  }, []);
    
  return (
    <div>
      <div className="absolute top-[806px] left-[481px] tracking-[0.1em]">
      Match history
      </div>
        <div className="absolute top-[866px] left-[479px] w-[490px] h-[45px] flex flex-row items-center justify-start gap-[67px]">
          <div className="w-[116px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[13px]">
            <img
              className="relative w-[45px] h-[45px] cursor-pointer"
              alt=""
              src="/icon2.svg"
              onClick={openMUserOpsDM}
            />
            <div className="relative tracking-[0.1em]">
              user2
            </div>
          </div>
          <div className="w-[307px] h-[23px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[45px]">
            <b className="relative tracking-[0.1em]">
              win
            </b>
            <div className="w-[226px] h-[23px] overflow-hidden flex flex-row items-center justify-start gap-[41px]">
              <div className="relative tracking-[0.1em]">
                7 - 2
              </div>
              <div className="relative tracking-[0.1em] text-silver-100">
                2023/07/16
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[943px] left-[479px] w-[489px] h-[45px] flex flex-row items-center justify-start gap-[68px]">
          <div className="w-[114px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[11px]">
            <img
              className="relative w-[45px] h-[45px] cursor-pointer"
              alt=""
              src="/icon3.svg"
              onClick={openMUserOpsDM}
            />
            <div className="relative tracking-[0.1em]">
              user4
            </div>
          </div>
          <div className="w-[307px] h-[23px] overflow-hidden flex flex-row items-center justify-start gap-[46px]">
            <div className="relative tracking-[0.1em]">
              lose
            </div>
             <div className="w-[226px] h-[23px] overflow-hidden flex flex-row items-center justify-start gap-[41px]">
            <div className="relative tracking-[0.1em]">
              3 - 5
            </div>
            <div className="relative tracking-[0.1em] text-silver-100">
              2023/07/15
            </div>
            </div>
          </div>
        </div>
        {isMUserOpsDMOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOpsDM}
        >
          <MUserOpsDM onClose={closeMUserOpsDM} />
        </ModalPopup>
      )}
    </div>
  );
};

export default MatchHistoryContainer;
