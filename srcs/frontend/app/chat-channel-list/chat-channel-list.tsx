"use client";

import React from 'react';
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import MJoinPrivateChannel from "../components/modal/m-join-private-channel";
import ModalPopup from "../components/modal/modal-popup";
import { useRouter } from "next/navigation";
import HeaderMenu from "../components/headermenu";

const ChannelListPage: NextPage = () => {
  const [isMJoinPrivateChannelPopupOpen, setMJoinPrivateChannelPopupOpen] =
    useState(false);
  const router = useRouter();

  const openMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(true);
  }, []);

  const closeMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-xl text-base-white font-body">
       <HeaderMenu />
        <div className="absolute top-[296px] left-[470px] bg-darkslategray-100 w-[500px] h-[729px]" />
        <div className="absolute top-[242px] left-[470px] w-[505px] h-[50px]">
          <div className="absolute top-[7px] left-[9px] w-[180px] flex flex-row items-start justify-center">
            <div className="relative tracking-[0.1em] inline-block w-[180px] h-[23px] flex-nowrap text-left">
              All channels
            </div>
          </div>
          <button
            className="cursor-pointer [border:none] py-[7px] px-0 bg-[transparent] absolute top-[0px] left-[190px] w-[300px] h-[38px] flex flex-row box-border items-start justify-center hover:bg-gray-500"
            onClick={openMJoinPrivateChannelPopup}
          >
            <div className="relative text-xl tracking-[0.1em] font-body text-gray-100 text-center inline-block w-[250px] h-[23px]">
              Join private channel
            </div>
          </button>
          <img
            className="absolute top-[47.5px] left-[0px] w-[450px] h-[5px]"
            alt=""
            src="/line-1.svg"
          />
        </div>

        <div className="absolute top-[298px] left-[470px] bg-darkslategray-100 box-border w-[400px] h-[50px] border-b-[1px] border-solid border-gray-100">
          <div className="absolute top-[0px] left-[0px] bg-darkslategray-100 box-border w-[430px] h-[50px] border-b-[1px] border-solid border-gray-100" />
          <div className="absolute top-[13px] left-[15px] w-[145px] h-[23px] flex flex-row items-start justify-start gap-[8px]">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="/lock.svg"
            />
            <div className="relative tracking-[0.1em] inline-block w-[200px] h-[23px] shrink-0">
              #channel 1
            </div>
          </div>
        </div>
        <div className="absolute top-[348px] left-[470px] bg-darkslategray-100 box-border w-[400px] h-[50px] border-b-[1px] border-solid border-gray-100">
          <div className="absolute top-[0px] left-[0px] bg-darkslategray-100 box-border w-[430px] h-[50px] border-b-[1px] border-solid border-gray-100" />
          <div className="absolute top-[13px] left-[42px] flex flex-row items-start justify-start gap-[8px]">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0 hidden"
              alt=""
              src="/lock2.svg"
            />
            <div className="relative tracking-[0.1em]">
              #channel 2
            </div>
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
