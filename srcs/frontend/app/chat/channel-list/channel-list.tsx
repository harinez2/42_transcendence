"use client";

import React from "react";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import MJoinPrivateChannel from "../../components/modal/m-join-private-channel";
import ModalPopup from "../../components/modal/modal-popup";
import HeaderMenu from "../../components/headermenu";

const ChannelListPage: NextPage = () => {
  const [isMJoinPrivateChannelPopupOpen, setMJoinPrivateChannelPopupOpen] =
    useState(false);

  const openMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(true);
  }, []);

  const closeMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        <div className="absolute left-[470px] top-[296px] h-[729px] w-[500px] bg-darkslategray-100" />
        <div className="absolute left-[470px] top-[242px] h-[50px] w-[505px]">
          <div className="absolute left-[9px] top-[7px] flex w-[180px] flex-row items-start justify-center">
            <div className="relative inline-block h-[23px] w-[180px] flex-nowrap text-left tracking-[0.1em]">
              All channels
            </div>
          </div>
          <button
            className="absolute left-[190px] top-[0px] box-border flex h-[38px] w-[300px] cursor-pointer flex-row items-start justify-center bg-[transparent] px-0 py-[7px] [border:none] hover:bg-gray-500"
            onClick={openMJoinPrivateChannelPopup}
          >
            <div className="relative inline-block h-[23px] w-[250px] text-center font-body text-xl tracking-[0.1em] text-gray-100">
              Join private channel
            </div>
          </button>
          <img
            className="absolute left-[0px] top-[47.5px] h-[5px] w-[450px]"
            alt=""
            src="/line-1.svg"
          />
        </div>

        <div className="absolute left-[470px] top-[298px] box-border h-[50px] w-[400px] border-b-[1px] border-solid border-gray-100 bg-darkslategray-100">
          <div className="absolute left-[0px] top-[0px] box-border h-[50px] w-[430px] border-b-[1px] border-solid border-gray-100 bg-darkslategray-100" />
          <div className="absolute left-[15px] top-[13px] flex h-[23px] w-[145px] flex-row items-start justify-start gap-[8px]">
            <img
              className="relative h-5 w-5 shrink-0 overflow-hidden"
              alt=""
              src="/lock.svg"
            />
            <div className="relative inline-block h-[23px] w-[200px] shrink-0 tracking-[0.1em]">
              #channel 1
            </div>
          </div>
        </div>
        <div className="absolute left-[470px] top-[348px] box-border h-[50px] w-[400px] border-b-[1px] border-solid border-gray-100 bg-darkslategray-100">
          <div className="absolute left-[0px] top-[0px] box-border h-[50px] w-[430px] border-b-[1px] border-solid border-gray-100 bg-darkslategray-100" />
          <div className="absolute left-[42px] top-[13px] flex flex-row items-start justify-start gap-[8px]">
            <img
              className="relative hidden h-5 w-5 shrink-0 overflow-hidden"
              alt=""
              src="/lock2.svg"
            />
            <div className="relative tracking-[0.1em]">#channel 2</div>
          </div>
        </div>
      </div>

      {isMJoinPrivateChannelPopupOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMJoinPrivateChannelPopup}
        >
          <MJoinPrivateChannel onClose={closeMJoinPrivateChannelPopup} />
        </ModalPopup>
      )}
    </>
  );
};

export default ChannelListPage;
