import React from "react";

type Channel = {
  id: number;
  name: string;
};

const ChannelName = ({ channel }: { channel: Channel }) => {
  return (
    <li>
      <a
        href="#"
        className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
      >
        <span className="ml-3">{channel.name}</span>
      </a>
    </li>
  );
};

export default ChannelName;
