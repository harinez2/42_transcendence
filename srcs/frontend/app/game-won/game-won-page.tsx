"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const GameWonPage: NextPage = () => {
  const router = useRouter();

  const onBackToChatClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const onPlayWithOtherClick = useCallback(() => {
    router.push("/game-match-making-parent");
  }, [router]);

  return (
    <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-77xl text-base-white font-body">
      <i className="absolute top-[392px] left-[493px] tracking-[0.1em]">
        You won!!
      </i>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[596px] left-[593px] w-[254px] h-[41px]"
        >
        <img
          className="absolute top-[0px] left-[0px] w-[254px] h-[41px] cursor-pointer"
          alt=""
          src="/rectangle-122.svg"
          onClick={onPlayWithOtherClick}
        />
        <div className="absolute top-[7px] left-[34px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[200px] h-[34px]">
          Play with other
        </div>
      </button>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[674px] left-[593px] w-[253.83px] h-[41px]"
        onClick={onBackToChatClick}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[253.83px] h-[41px]"
          alt=""
          src="/rectangle-12111.svg"
        />
        <div className="absolute top-[7px] left-[46px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[188px] h-[34px]">
          Back to chat
        </div>
      </button>
      <div className="absolute top-[652px] left-[1051px] w-[449px] h-[464px]">
        <img
          className="absolute top-[173px] left-[0px] w-[352px] h-44 object-cover"
          alt=""
          src="/brazuca-medal@2x.png"
        />
        <img
          className="absolute top-[0px] left-[113px] w-[336px] h-[464px] object-cover"
          alt=""
          src="/brazuca-dog@2x.png"
        />
      </div>
    </div>
  );
};

export default GameWonPage;
