"use client";

import React from "react";
import type { NextPage } from "next";
import makeAPIRequest from "@/app/api/api";
import { useCallback, useContext, useEffect, useState } from "react";
import MJoinPrivateChannel from "../../components/modal/m-join-private-channel";
import ModalPopup from "../../components/modal/modal-popup";
import HeaderMenu from "../../components/headermenu";
import type { ProfileType } from "../../types";
import type { ChannelType } from "../types";
import { ProfileContext } from "../../layout";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";

const ChannelListPage: NextPage = () => {
  const [isMJoinPrivateChannelPopupOpen, setMJoinPrivateChannelPopupOpen] =
    useState(false);

  const openMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(true);
  }, []);

  const closeMJoinPrivateChannelPopup = useCallback(() => {
    setMJoinPrivateChannelPopupOpen(false);
  }, []);

  const profile: ProfileType = useContext(ProfileContext);

  const router = useRouter();

  const [channels, setChannels] = useState<ChannelType[]>([]);

  useEffect(() => {
    if (profile && profile.userId) {
      // チャンネル一覧を取得
      makeAPIRequest<ChannelType[]>("get", "/chats/public")
        .then((result) => {
          if (result.success) {
            setChannels(result.data);
            console.log(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  // channel に join する
  const joinChannel = (channel: ChannelType) => {
    // PUT /chats/channelId/users を呼び出す
    makeAPIRequest("put", `/chats/${channel.channelId}/users`)
      .then((result) => {
        if (result.success) {
          console.log("join channel success");
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        <div className="relative top-[100px] flex h-[calc(100%_-_132px)] w-full flex-col items-center justify-start ">
          <ChannelList
            channels={channels}
            joinChannel={joinChannel}
            router={router}
            openModalPopup={openMJoinPrivateChannelPopup}
          />
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

const ChannelList = ({
  channels,
  joinChannel,
  router,
  openModalPopup,
}: {
  channels: ChannelType[];
  joinChannel: (channel: ChannelType) => void; // eslint-disable-line no-unused-vars
  router: any;
  openModalPopup: () => void; // eslint-disable-line no-unused-vars
}) => {
  return (
    <>
      <ChannelHeader openModalPopup={openModalPopup} />
      <div className="grid w-2/5 grid-cols-1 divide-y divide-solid divide-gray-300">
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.channelId}
              channel={channel}
              joinChannel={joinChannel}
              router={router}
            />
          );
        })}
      </div>
    </>
  );
};

const ChannelHeader = ({
  openModalPopup,
}: {
  openModalPopup: () => void; // eslint-disable-line no-unused-vars
}) => {
  return (
    <div className="top flex w-2/4 flex-row justify-evenly rounded border-b-4 border-solid border-gray-200 p-1">
      <div className="w-1/3 whitespace-nowrap  text-center text-base">
        All channels
      </div>
      <div
        className="w-1/3 cursor-pointer  whitespace-nowrap text-center text-base text-gray-400"
        onClick={openModalPopup}
      >
        Join private channel
      </div>
    </div>
  );
};

const Channel = ({
  channel,
  joinChannel,
  router,
}: {
  channel: ChannelType;
  joinChannel: (channel: ChannelType) => void; // eslint-disable-line no-unused-vars
  router: any;
}) => {
  return (
    <Tooltip title="join channel" arrow placement="right">
      <div className="h-8">
        <div
          className="cursor-pointer rounded-md hover:bg-gray-600"
          onClick={() => {
            joinChannel(channel);
            console.log(router);
            router.push(`/chat`);
          }}
        >
          {channel.channelName}
        </div>
      </div>
    </Tooltip>
  );
};

export default ChannelListPage;
