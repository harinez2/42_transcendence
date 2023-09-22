import React from "react";
import useModal from "../components/useModal";
import type { ChannelType } from "./types";
import MEditChannel from "../components/modal/m-edit-channel";

const ChannelName = ({
  channel,
  setChannel,
  onSelectChannel,
  removeChannel,
}: {
  channel: ChannelType;
  setChannel: (c: ChannelType) => void;
  onSelectChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
  removeChannel: (channelId: number) => void;
}) => {
  const { ref, showModal, closeModal } = useModal();

  const handleClick = () => {
    onSelectChannel(channel);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showModal();
  };

  return (
    <li>
      <a
        href="#"
        className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        onClick={handleClick}
        onContextMenu={onContextMenu}
      >
        <span className="ml-3">
          {channel.channelName}
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

        {channel.channelType === "PRIVATE" && <span className="mr-2">🔒</span>}
      </a>
    </li>
  );
};

export default ChannelName;
