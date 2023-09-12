"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../../components/game-background";
import GameCanvasComponent from "./game_canvas";
import { ProfileContext, SocketContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { GameInfoType } from "../types";
import { ProfileType } from "@/app/types";
import GameInfoComponent from "./game_info";

const GamePlayingUI = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const profile: ProfileType = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [gameInfo, setgameInfo] = useState<GameInfoType>();
  const [user1Score, setUser1Score] = useState<number>(0);
  const [user2Score, setUser2Score] = useState<number>(0);

  useEffect(() => {
    if (socket) {
      socket.on("game-start", (data: any) => {
        console.log(`game-start: gameId=${data}`);
        setIsWaiting(false);
        socket?.off("game-start");
      });
    }
  }, [socket]);

  useEffect(() => {
    // ゲーム情報を取得
    makeAPIRequest<GameInfoType>("get", `/games/${params.id}`)
      .then((result) => {
        if (result.success) {
          setgameInfo(result.data);
          if (result.data.endedAt) {
            socket?.off("game-update_score");
            router.push(`/game/${params.id}/result`);
          }
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  useEffect(() => {
    if (socket && profile) {
      socket.emit("game-join", { gameId: params.id, userId: profile.userId });
      // スコアを受け取る
      socket.on("game-update_score", (data: any) => {
        console.log("update_score: ", data);
        setUser1Score(data.user1Score);
        setUser2Score(data.user2Score);
        if (data.isGameFinished) {
          socket?.off("game-update_score");
          router.push(`/game/${params.id}/result`);
        }
      });
    }
    return () => {
      socket?.off("game-update_score");
    };
  }, [socket, profile]);

  return (
    <GameBackground user1="" user2="">
      <div className="flex h-screen items-center justify-center">
        <div className="ml-3 shrink-0 pr-8 text-29xl">
          {isWaiting ? (
            <span>
              Waiting for the opponent...
              <br />
            </span>
          ) : (
            <GameInfoComponent
              gameInfo={gameInfo}
              user1Score={user1Score}
              user2Score={user2Score}
            />
          )}
          <GameCanvasComponent gameId={Number(params.id)} />
        </div>
      </div>
    </GameBackground>
  );
};

export default GamePlayingUI;
