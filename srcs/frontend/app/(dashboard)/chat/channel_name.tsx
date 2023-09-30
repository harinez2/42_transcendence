import React, { useContext } from "react";
import Image from "next/image";
import type { ChannelType } from "./types";
import MEditChannel from "../components/modal/m-edit-channel";
import { Tooltip } from "@mui/material";
import { ProfileType } from "../../types";
import { ProfileContext } from "../layout";
import makeAPIRequest from "../../api/api";
import ModalPopup from "../components/modal/modal-popup";

const ChannelName = ({
  channel,
  userId,
  setChannel,
  onSelectChannel,
  removeChannel,
  handleChannelLeave,
}: {
  channel: ChannelType;
  userId: number;
  setChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
  onSelectChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
  removeChannel: (channelId: number) => void; // eslint-disable-line no-unused-vars
  handleChannelLeave: (channelId: ChannelType) => void; // eslint-disable-line no-unused-vars
}) => {
  const [open, setOpen] = React.useState(false);
  const profile: ProfileType = useContext(ProfileContext);

  const onClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleClick = () => {
    onSelectChannel(channel);
  };

  const leaveChannel = () => {
    // PUT /chats/channelId/users を呼び出す
    if (profile && profile.userId) {
      makeAPIRequest("delete", `/chats/${channel.channelId}/users`)
        .then((result) => {
          if (result.success) {
            removeChannel(channel.channelId);
            // 現在の channel が leave した channel だった場合は、selectedChannel を null にする
            handleChannelLeave(channel);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  return (
    <li className="h-12 rounded-lg hover:bg-gray-700">
      <div className="cursor-pointer text-white" onClick={handleClick}>
        <span className="ml-3 flex flex-row items-center justify-between">
          <div className="flex flex-initial shrink-0 flex-row text-2xl text-gray-300">
            <div>{channel.channelName}</div>

            {channel.channelType === "PRIVATE" && (
              <span className="mr-2">🔒</span>
            )}
          </div>

          {channel.users.owner === userId ? (
            <Tooltip title="Edit channel" arrow placement="right">
              <Image
                src="/crown@2x.png"
                className="z-10 h-auto max-w-full rounded-full bg-black p-1"
                width={24}
                height={24}
                alt=""
                onClick={openModal}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Leave channel" arrow placement="right">
              <Image
                src="/exit-svgrepo-com.svg"
                className="z-10 h-auto max-w-full rounded-full bg-gray-300"
                width={24}
                height={24}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  leaveChannel();
                }}
              />
            </Tooltip>
          )}

          {open && (
            <ModalPopup
              overlayColor="rgba(113, 113, 113, 0.3)"
              placement="Centered"
              onOutsideClick={onClose}
            >
              <MEditChannel
                isClose={!open}
                onClose={onClose}
                channel={channel}
                setChannel={setChannel}
                removeChannel={removeChannel}
              />
            </ModalPopup>
          )}
        </span>
      </div>
    </li>
  );
};

export default ChannelName;
