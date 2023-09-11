"use client";

import type { NextPage } from "next";
import { useState, useCallback } from "react";
import ModalPopup from "../../components/modal/modal-popup";
import MSettingsMine from "../../components/modal/m-settings-mine";
import HeaderMenu from "../../components/headermenu";
import RankingContainer from "../../components/raking-container";
import MatchHistoryContainer from "../../components/match-history-container";
import React from "react";

const MePage: NextPage = () => {
  const [isMSettingsMinePopupOpen, setMSettingsMinePopupOpen] = useState(false);

  const openMSettingsMinePopup = useCallback(() => {
    setMSettingsMinePopupOpen(true);
  }, []);

  const closeMSettingsMinePopup = useCallback(() => {
    setMSettingsMinePopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        <div className="absolute left-[481px] top-[200px] tracking-[0.1em]">
          Your Profile
        </div>
        <img
          className="absolute left-[470px] top-[242.5px] h-[5px] w-[500px]"
          alt=""
          src="/line-1.svg"
        />

        <div className="absolute left-[492px] top-[283px] flex h-[45px] w-[439px] flex-row items-center justify-start gap-[227px] overflow-hidden text-17xl">
          <div className="flex h-[45px] w-[177px] shrink-0 flex-row items-center justify-start gap-[27px] overflow-hidden">
            <img
              className="relative h-[45px] w-[45px]"
              alt=""
              src="/icon1.svg"
            />
            <div className="relative tracking-[0.1em]">user1</div>
          </div>
          <img
            className="relative h-[35px] w-[35px] cursor-pointer"
            alt=""
            src="/settings-icon.svg"
            onClick={openMSettingsMinePopup}
          />
        </div>
        <div className="absolute left-[492px] top-[401px] flex h-7 w-[354px] flex-row items-center justify-start text-5xl">
          <div className="relative tracking-[0.1em]">
            two-factor authentication
          </div>
        </div>
        <div className="absolute left-[891.5px] top-[401px] h-7 w-[60px] text-5xl">
          <div className="absolute left-[0px] top-[3px] h-[25px] w-[60px] rounded-8xs bg-gray-500" />
          <div className="absolute left-[15px] top-[0px] tracking-[0.1em]">
            on
          </div>
        </div>
        <img
          className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer userId="1" />
        <img
          className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer userId="1" />
      </div>
      {isMSettingsMinePopupOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMSettingsMinePopup}
        >
          <MSettingsMine onClose={closeMSettingsMinePopup} />
        </ModalPopup>
      )}
    </>
  );
};

export default MePage;
