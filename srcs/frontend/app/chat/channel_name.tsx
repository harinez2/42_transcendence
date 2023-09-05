import React from "react";
import type { ChannelType } from "./types";

const ChannelName = ({
  channel,
  onSelectChannel,
}: {
  channel: ChannelType;
  onSelectChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
}) => {
  const handleClick = () => {
    onSelectChannel(channel);
  };

  return (
    <li>
      <a
        href="#"
        className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        onClick={handleClick}
      >
        <span className="ml-3">{channel.channelName}</span>
        {channel.channelType === "PRIVATE" && <span className="mr-2">🔒</span>}
      </a>
    </li>
  );
};

export default ChannelName;
