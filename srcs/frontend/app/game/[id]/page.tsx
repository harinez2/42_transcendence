"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../../components/game-background";

const GamePlayingUI = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  return (
    <GameBackground user1="" user2="">
      <div className="flex h-screen items-center justify-center">
        <span className="ml-3 shrink-0 pr-8 text-29xl">
          game id: {params.id}
        </span>
      </div>
    </GameBackground>
  );
};

export default GamePlayingUI;
