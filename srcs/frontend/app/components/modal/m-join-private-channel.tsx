import React from 'react';
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import MJoinChannelPassword from "./m-join-channel-password";
import ModalPopup from "./modal-popup";

type MJoinPrivateChannelType = {
  onClose?: () => void;
};

const MJoinPrivateChannel: NextPage<MJoinPrivateChannelType> = ({ onClose }) => {
  const [isMJoinChannelPasswordPopupOpen, setMJoinChannelPasswordPopupOpen] =
    useState(false);

  const openMJoinChannelPasswordPopup = useCallback(() => {
    setMJoinChannelPasswordPopupOpen(true);
  }, []);

  const closeMJoinChannelPasswordPopup = useCallback(() => {
    setMJoinChannelPasswordPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative bg-darkslategray-100 w-[390px] h-[280px] overflow-hidden max-w-full max-h-full text-left text-5xl text-base-white font-body">
        <div className="absolute top-[50px] left-[32px] tracking-[0.1em]">
          Join private channel
        </div>
        <TextField
          className="[border:none] bg-[transparent] absolute top-[116px] left-[75px]"
          sx={{ width: 241 }}
          color="info"
          variant="filled"
          type="text"
          name="Channel name"
          label="Channel name"
          size="medium"
          margin="none"
        />
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[181px] left-[75px] w-[222px] h-[42px]"
          onClick={openMJoinChannelPasswordPopup}
        >
          <img
            className="absolute top-[calc(50%_-_21px)] left-[calc(50%_-_111px)] w-[240.84px] h-[41px]"
            alt=""
            src="/rectangle-12121.svg"
          />
          <div className="absolute top-[calc(50%_-_13px)] left-[calc(50%_-_73px)] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[171px] h-[34px]">
            Join channel
          </div>
        </button>
      </div>
      {isMJoinChannelPasswordPopupOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMJoinChannelPasswordPopup}
        >
          <MJoinChannelPassword onClose={closeMJoinChannelPasswordPopup} />
        </ModalPopup>
      )}
    </>
  );
};

export default MJoinPrivateChannel;
