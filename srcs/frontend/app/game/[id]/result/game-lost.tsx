"use client";

import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const GameLostPage: NextPage = () => {
  const router = useRouter();

  const onSignInClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const onSignIn1Click = useCallback(() => {
<<<<<<< HEAD:srcs/frontend/app/game/[id]/result/game-lost.tsx
=======
    router.push("/game/match-making-parent");
  }, [router]);

  const onRectangle1Click = useCallback(() => {
>>>>>>> f1b7fd52dde60a23a1dc07beea04db32e91844ca:srcs/frontend/app/game/[gameId]/result/lost/game-lost-page.tsx
    router.push("/game");
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-77xl text-base-white">
      <i className="absolute left-[491px] top-[392px] tracking-[0.1em]">
        You lost...
      </i>
      <button
        className="absolute left-[590px] top-[583px] h-[41px] w-[257px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onSignIn1Click}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[257px] cursor-pointer"
          alt=""
          src="/rectangle-123.svg"
        />
        <div className="absolute left-[30px] top-[7px] inline-block h-[34px] w-[220px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Play with other
        </div>
      </button>
      <button
        className="absolute left-[593px] top-[670px] h-[41px] w-[253.83px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onSignInClick}
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
      <img
        className="absolute left-[1079px] top-[723px] h-[301px] w-[433px] object-cover"
        alt=""
        src="/brazuca-cat@2x.png"
      />
    </div>
  );
};

export default GameLostPage;
