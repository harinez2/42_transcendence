"use client";

import type { NextPage } from "next";
import { useState, useCallback } from "react";
import ModalPopup from "../components/modal/modal-popup";
import MSettingsMine from "../components/modal/m-settings-mine";
import HeaderMenu from "../components/headermenu";
import RankingContainer from "../components/raking-container";
import MatchHistoryContainer from "../components/match-history-container";

const ProfileMinePage: NextPage = () => {

  const [isMSettingsMinePopupOpen, setMSettingsMinePopupOpen] = useState(false);



  const openMSettingsMinePopup = useCallback(() => {
    setMSettingsMinePopupOpen(true);
  }, []);

  const closeMSettingsMinePopup = useCallback(() => {
    setMSettingsMinePopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-xl text-base-white font-body">
        <HeaderMenu />
        <div className="absolute top-[200px] left-[481px] tracking-[0.1em]">
          Your Profile
        </div>
        <img
          className="absolute top-[242.5px] left-[470px] w-[500px] h-[5px]"
          alt=""
          src="/line-1.svg"
        />
  
          <div className="absolute top-[283px] left-[492px] w-[439px] h-[45px] overflow-hidden flex flex-row items-center justify-start gap-[227px] text-17xl">
          <div className="w-[177px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[27px]">
            <img
              className="relative w-[45px] h-[45px]"
              alt=""
              src="/icon1.svg"
            />
            <div className="relative tracking-[0.1em]">
              user1
            </div>
          </div>
          <img
            className="relative w-[35px] h-[35px] cursor-pointer"
            alt=""
            src="/settings-icon.svg"
            onClick={openMSettingsMinePopup}
          />
        </div>
        <div className="absolute top-[401px] left-[492px] w-[354px] h-7 flex flex-row items-center justify-start text-5xl">
          <div className="relative tracking-[0.1em]">
            two-factor authentication
          </div>
        </div>
        <div className="absolute top-[401px] left-[891.5px] w-[60px] h-7 text-5xl">
          <div className="absolute top-[3px] left-[0px] rounded-8xs bg-gray-500 w-[60px] h-[25px]" />
          <div className="absolute top-[0px] left-[15px] tracking-[0.1em]">
            on
          </div>
        </div>
        <img
          className="absolute top-[473px] left-[470px] w-[500px] h-0.5"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer/>
        <img
          className="absolute top-[768px] left-[470px] w-[500px] h-0.5"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer/>
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

export default ProfileMinePage;
