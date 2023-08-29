"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const GameLostPage: NextPage = () => {
  const router = useRouter();

  const onSignInClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const onSignIn1Click = useCallback(() => {
    router.push("/game-match-making-parent");
  }, [router]);

  const onRectangle1Click = useCallback(() => {
    router.push("/game");
  }, [router]);

  return (
    <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-77xl text-base-white font-body">
      <i className="absolute top-[392px] left-[491px] tracking-[0.1em]">
        You lose...
      </i>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[583px] left-[590px] w-[257px] h-[41px]"
        onClick={onSignIn1Click}
      >
        <img
          className="absolute top-[0px] left-[0px] w-[257px] h-[41px] cursor-pointer"
          alt=""
          src="/rectangle-123.svg"
          onClick={onRectangle1Click}
        />
        <div className="absolute top-[7px] left-[30px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[220px] h-[34px]">
          Play with other
        </div>
      </button>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[670px] left-[593px] w-[253.83px] h-[41px]"
        onClick={onSignInClick}
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
      <img
        className="absolute top-[723px] left-[1079px] w-[433px] h-[301px] object-cover"
        alt=""
        src="/brazuca-cat@2x.png"
      />
    </div>
  );
};

export default GameLostPage;
