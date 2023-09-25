import React from "react";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import MJoinChannelPassword from "./m-join-channel-password";
import ModalPopup from "./modal-popup";
import makeAPIRequest from "@/app/api/api";
import { ChannelType, Publicity } from "@/app/chat/types";
import { useRouter } from "next/navigation";

type MJoinPrivateChannelType = {
  onClose?: () => void;
};

const MJoinPrivateChannel: NextPage<MJoinPrivateChannelType> = ({
  onClose, // eslint-disable-line no-unused-vars
}) => {
  const router = useRouter();
  const [isMJoinChannelPasswordPopupOpen, setMJoinChannelPasswordPopupOpen] =
    useState(false);

  const [error, setError] = useState("");
  const [channelName, setChannelName] = useState("");

  const [channel, setChannel] = useState<ChannelType>();

  const openMJoinChannelPasswordPopup = useCallback(() => {
    setMJoinChannelPasswordPopupOpen(true);
  }, []);

  const closeMJoinChannelPasswordPopup = useCallback(() => {
    setMJoinChannelPasswordPopupOpen(false);
  }, []);

  // channel に join する
  const joinChannel = (channel: ChannelType) => {
    // PUT /chats/channelId/users を呼び出す
    makeAPIRequest("put", `/chats/${channel.channelId}/users`)
      .then((result) => {
        if (result.success) {
          console.log("join channel success");
        } else {
          setError(result.error);
        }
      })
      .catch((error) => {
        setError("Error:" + error.message);
      });
  };

  const findChannel = useCallback(
    async (channelName: string) => {
      // GET /chats/search を呼び出す
      await makeAPIRequest<ChannelType>(
        "get",
        `/chats/search?channelName=${channelName}`,
      )
        .then((result) => {
          if (result.success) {
            console.log("find channel success");
            setChannel(result.data);
            if (result.data.channelType === Publicity.PRIVATE) {
              // パスワードが設定されている場合はパスワード入力画面を表示
              if (result.data.isPassword) {
                console.log("パスワードが設定されている");
                openMJoinChannelPasswordPopup();
                return;
              }
            }
            // パスワードが設定されていない場合はそのまま入室
            // PUT /chats/channelId/users を呼び出す
            joinChannel(result.data);
            if (onClose) {
              onClose();
              router.push("/chat");
            }
          } else {
            setError(result.error);
          }
        })
        .catch((error) => {
          setError("Error:" + error.message);
        });
    },
    [channelName],
  );

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
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button
          className="absolute left-[75px] top-[181px] h-[42px] w-[222px] cursor-pointer bg-[transparent] p-0 [border:none]"
          onClick={() => findChannel(channelName)}
        >
          <img
            className="absolute left-[calc(50%_-_111px)] top-[calc(50%_-_21px)] h-[41px] w-[240.84px]"
            alt=""
            src="/rectangle-12121.svg"
          />
          <div className="absolute left-[calc(50%_-_73px)] top-[calc(50%_-_13px)] inline-block h-[34px] w-[171px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
            Join channel
          </div>
          {error != null && (
            <p className="text-md absolute left-[calc(50%_-_73px)] top-[calc(100%)] inline-block h-[20px] w-[171px] text-left font-body tracking-[0.1em] text-base-white">
              {error}
            </p>
          )}
        </button>
      </div>
      {isMJoinChannelPasswordPopupOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMJoinChannelPasswordPopup}
        >
          <MJoinChannelPassword
            onClose={closeMJoinChannelPasswordPopup}
            channel={channel}
          />
        </ModalPopup>
      )}
    </>
  );
};

export default MJoinPrivateChannel;
