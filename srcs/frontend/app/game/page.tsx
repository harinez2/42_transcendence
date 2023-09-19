"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../components/game-background";
import Header from "../components/header";
import makeAPIRequest from "../api/api";
import { ProfileType } from "../types";
import { ProfileContext } from "../layout";
import { GameInfoType } from "./types";

const GameUI = () => {
  const router = useRouter();
  const profile: ProfileType = useContext(ProfileContext);

  useEffect(() => {
    if (profile && profile.userId) {
      // 継続中のゲームがあればページ遷移
      makeAPIRequest<GameInfoType[]>("get", `/games/user/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            result.data.map((gameInfo) => {
              if (gameInfo.startedAt != null && gameInfo.endedAt === null) {
                router.push(`/game/${gameInfo.gameId}`);
                return;
              }
            });
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  return (
    <>
      <Header />
      <GameBackground user1="" user2="">
        <div className="flex h-screen items-center justify-center">
          <button
            onClick={() => router.push("/game/preparing")}
            className="group flex cursor-pointer items-center rounded-lg bg-black p-2 text-white hover:bg-gray-700"
          >
            <span className="ml-3 shrink-0 pr-8 text-29xl">Play game</span>
          </button>
        </div>
      </GameBackground>
    </>
  );
};

export default GameUI;
