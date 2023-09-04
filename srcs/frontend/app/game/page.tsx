"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../components/game-background";

const GameUI = () => {
  const router = useRouter();
  return (
    <GameBackground user1="" user2="">
      <div className="flex h-screen items-center justify-center">
        <button
          onClick={() => router.push("/game-preparing")}
          className="group flex items-center rounded-lg bg-black p-2 text-white hover:bg-gray-700 cursor-pointer"
        >
          <span className="ml-3 shrink-0 pr-8 text-29xl">Play game</span>
        </button>
      </div>
    </GameBackground>
  );
};

export default GameUI;
