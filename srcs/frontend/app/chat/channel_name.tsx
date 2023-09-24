import React from "react";
import useModal from "../components/useModal";
import Image from "next/image";
import type { ChannelType } from "./types";
import MEditChannel from "../components/modal/m-edit-channel";
import { Tooltip } from "@mui/material";

const ChannelName = ({
  channel,
  userId,
  setChannel,
  onSelectChannel,
  removeChannel,
}: {
  channel: ChannelType;
  userId: number;
  setChannel: (c: ChannelType) => void;
  onSelectChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
  removeChannel: (channelId: number) => void;
}) => {
  const { ref, showModal, closeModal } = useModal();

  const handleClick = () => {
    onSelectChannel(channel);
  };

  return (
    <li className="h-12 rounded-lg hover:bg-gray-700">
      <a href="#" className="text-white" onClick={handleClick}>
        <span className="ml-3 flex flex-row items-center justify-between">
          <div className="flex flex-initial shrink-0 flex-row text-2xl text-gray-300">
            <div>{channel.channelName}</div>

            {channel.channelType === "PRIVATE" && (
              <span className="mr-2">🔒</span>
            )}
          </div>

          {channel.users.owner === userId && (
            <Tooltip title="Edit channel" arrow placement="right">
              <Image
                src="/crown@2x.png"
                className="z-10 h-auto max-w-full rounded-full bg-black p-1"
                width={24}
                height={24}
                alt=""
                onClick={showModal}
              />
            </Tooltip>
          )}
          <dialog
            onClick={closeModal}
            ref={ref}
            style={{ top: "30px" }}
            className="rounded-lg bg-gray-600"
          >
            <MEditChannel
              onClose={closeModal}
              channel={channel}
              setChannel={setChannel}
              removeChannel={removeChannel}
            />
          </dialog>
        </span>
      </a>
    </li>
  );
};

export default ChannelName;
