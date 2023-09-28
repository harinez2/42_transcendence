"use client";

import React, { useContext } from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { SocketContext } from "../../../layout";

const GameWonPage: NextPage = () => {
  const router = useRouter();
  const socket: any = useContext(SocketContext);

  const onBackToChatClick = useCallback(() => {
    if (socket) {
      // オンラインを申告
      console.log("sent status-switch_to_online: socketId=", socket?.id);
      socket?.emit("status-switch_to_online");
    }

    router.push("/chat");
  }, [router]);

  const onPlayWithOtherClick = useCallback(() => {
    if (socket) {
      // オンラインを申告
      console.log("sent status-switch_to_online: socketId=", socket?.id);
      socket?.emit("status-switch_to_online");
    }

    router.push("/game");
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-77xl text-base-white">
      <i className="absolute left-[493px] top-[392px] tracking-[0.1em]">
        You won!!
      </i>
      <button
        className="absolute left-[593px] top-[596px] h-[41px] w-[254px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onPlayWithOtherClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[254px] cursor-pointer"
          alt=""
          src="/rectangle-122.svg"
        />
        <div className="absolute left-[34px] top-[7px] inline-block h-[34px] w-[200px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Play with other
        </div>
      </button>
      <button
        className="absolute left-[593px] top-[674px] h-[41px] w-[253.83px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onBackToChatClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[253.83px]"
          alt=""
          src="/rectangle-12111.svg"
        />
        <div className="absolute left-[46px] top-[7px] inline-block h-[34px] w-[188px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Back to chat
        </div>
      </button>
      <div className="absolute left-[1051px] top-[652px] h-[464px] w-[449px]">
        <img
          className="absolute left-[0px] top-[173px] h-44 w-[352px] object-cover"
          alt=""
          src="/brazuca-medal@2x.png"
        />
        <img
          className="absolute left-[113px] top-[0px] h-[464px] w-[336px] object-cover"
          alt=""
          src="/brazuca-dog@2x.png"
        />
      </div>
    </div>
  );
};

export default GameWonPage;
