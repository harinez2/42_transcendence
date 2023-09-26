"use client";

import React, { useState } from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { User } from "@/app/chat/user";
import { ChannelType } from "@/app/chat/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Socket } from "socket.io-client";
import { ProfileType } from "@/app/types";
import makeAPIRequest from "@/app/api/api";

type MChatChannelOpsType = {
  onClose: () => void;
  stopPropagation: any;
  user: User | undefined;
  router: AppRouterInstance;
  socket: Socket;
  profile: ProfileType;
  channel: ChannelType | null;
};

export const MChatChannelOps: NextPage<MChatChannelOpsType> = ({
  onClose,
  stopPropagation,
  user,
  router,
  socket, // eslint-disable-line no-unused-vars
  profile, // eslint-disable-line no-unused-vars
  channel,
}: MChatChannelOpsType) => {
  const [error, setError] = useState("");

  const onClickKick = useCallback(async () => {
    if (channel && user) {
      await makeAPIRequest<ChannelType>(
        "delete",
        `/chats/${channel.channelId}/users/${user.id}`,
      )
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Kick: " + result.error);
          }
        })
        .catch(() => {
          setError("Kick: An unexpected error occured.");
        });
    }
  }, [router]);

  const onClickBan = useCallback(async () => {
    if (channel && user) {
      await makeAPIRequest<ChannelType>(
        "put",
        `/chats/${channel.channelId}/ban`,
        {
          bannedUserId: user.id,
        },
      )
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Ban: " + result.error);
          }
        })
        .catch(() => {
          setError("Ban: An unexpected error occured.");
        });
    }
  }, [router]);

  const onClickMute = useCallback(async () => {
    if (channel && user) {
      const dateFiveMinLaterUnix = new Date().getTime() + 300000; //300ミリ秒=5分
      const dateFiveMinLater = new Date(dateFiveMinLaterUnix);
      await makeAPIRequest<ChannelType>(
        "put",
        `/chats/${channel.channelId}/mute`,
        {
          mutedUserId: user.id,
          muteUntil: dateFiveMinLater,
        },
      )
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Mute: " + result.error);
          }
        })
        .catch(() => {
          setError("Mute: An unexpected error occured.");
        });
    }
  }, [router]);

  const onClickAddAdmin = useCallback(async () => {
    if (channel && user) {
      await makeAPIRequest<ChannelType>(
        "put",
        `/chats/${channel.channelId}/admins`,
        {
          userId: user.id,
        },
      )
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Add Admin: " + result.error);
          }
        })
        .catch(() => {
          setError("Add Admin: An unexpected error occured.");
        });
    }
  }, [router]);

  const onClickRemoveAdmin = useCallback(async () => {
    if (channel && user) {
      await makeAPIRequest<ChannelType>(
        "delete",
        `/chats/${channel.channelId}/admins/${user.id}`,
      )
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Remove Admin: " + result.error);
          }
        })
        .catch(() => {
          setError("Remove Admin: An unexpected error occured.");
        });
    }
  }, [router]);

  return (
    <div
      onClick={stopPropagation}
      className="relative h-[485px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white"
    >
      <div className="absolute left-[41px] top-[38px] tracking-[0.1em]">
        Channel ops for {user?.username}
      </div>

      <button
        className="absolute left-[59px] top-[100px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onClickKick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Kick
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[170px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onClickBan}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Ban
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[240px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onClickMute}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Mute 5 mins
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[310px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onClickAddAdmin}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Add admin
        </div>
      </button>

      <button
        className="absolute left-[59px] top-[380px] h-[41px] w-[241px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onClickRemoveAdmin}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[241px]"
          alt=""
          src="/rectangle-128.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Remove admin
        </div>
      </button>

      <div className="absolute left-[59px] top-[420px]">
        <span className="h-[41px] w-[200px] text-center text-xl normal-case tracking-tighter text-red-600">
          {error && <p>{error}</p>}
        </span>
      </div>
    </div>
  );
};

export default MChatChannelOps;
