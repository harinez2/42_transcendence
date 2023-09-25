"use client";

import React, { useContext } from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChannelType } from "@/app/chat/types";
import makeAPIRequest from "@/app/api/api";
import { ProfileContext } from "@/app/layout";
import { ProfileType } from "@/app/types";

type MJoinChannelPasswordType = {
  onClose?: () => void;
  channel: ChannelType;
};

const MJoinChannelPassword: NextPage<MJoinChannelPasswordType> = ({
  onClose, // eslint-disable-line no-unused-vars
  channel,
}) => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const profile: ProfileType = useContext(ProfileContext);

  const [password, setPassword] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const joinChannel = useCallback(
    async (channel: ChannelType, password: string) => {
      // PUT /chats/channelId/users を呼び出す
      console.log("channelId: ", channel.channelId);
      if (profile && profile.userId) {
        console.log(password);
        await makeAPIRequest("put", `/chats/${channel.channelId}/users`, {
          password: password,
        })
          .then((result) => {
            if (result.success) {
              console.log("join channel success");
              router.push("/chat");
              return;
            } else {
              setError(result.error);
            }
          })
          .catch((error) => {
            setError("Error:" + error.message);
          });
      }
    },
    [channel, password],
  );

  return (
    <div className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white">
      <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
        channel name: {channel.channelName}
      </div>
      <TextField
        className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        name="Password"
        label="Password"
        size="medium"
        margin="none"
        value={password}
        onChange={handleChange}
      />
      <button
        className="absolute left-[75px] top-[181px] h-[42px] w-[222px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={() => joinChannel(channel, password)}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[240.84px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute left-[43px] top-[8px] inline-block h-[34px] w-[171px] text-left font-body text-5xl tracking-[0.1em] text-base-white">{`Join channel `}</div>
        {error != null && (
          <p className="text-md absolute left-[calc(50%_-_73px)] top-[calc(100%)] inline-block h-[20px] w-[171px] text-left font-body tracking-[0.1em] text-base-white">
            {error}
          </p>
        )}
      </button>
    </div>
  );
};

export default MJoinChannelPassword;
