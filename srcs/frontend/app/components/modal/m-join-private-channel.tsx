import React from "react";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import MJoinChannelPassword from "./m-join-channel-password";
import ModalPopup from "./modal-popup";

type MJoinPrivateChannelType = {
  onClose?: () => void;
};

const MJoinPrivateChannel: NextPage<MJoinPrivateChannelType> = ({
  onClose,
}) => {
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
      <div className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
        <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
          Join private channel
        </div>
        <TextField
          className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
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
          className="absolute left-[75px] top-[181px] h-[42px] w-[222px] cursor-pointer bg-[transparent] p-0 [border:none]"
          onClick={openMJoinChannelPasswordPopup}
        >
          <img
            className="absolute left-[calc(50%_-_111px)] top-[calc(50%_-_21px)] h-[41px] w-[240.84px]"
            alt=""
            src="/rectangle-12121.svg"
          />
          <div className="absolute left-[calc(50%_-_73px)] top-[calc(50%_-_13px)] inline-block h-[34px] w-[171px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
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
