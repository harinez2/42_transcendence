"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../../components/game-background";
import GameCanvasComponent from "./game_canvas";
import { ErrorContext, SocketContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { GameInfoType } from "../types";

const GamePlayingUI = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const socket: any = useContext(SocketContext);
  const error: any = useContext(ErrorContext);
  const [gameInfo, setgameInfo] = useState<GameInfoType>();
  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    socket?.emit("game-join");
  }, [socket]);

  useEffect(() => {
    // ゲーム情報を取得
    makeAPIRequest<GameInfoType>("get", `/games/${params.id}`)
      .then((result) => {
        if (result.success) {
          setgameInfo(result.data);
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <GameBackground user1="" user2="">
      <div className="flex h-screen items-center justify-center">
        <div className="ml-3 shrink-0 pr-8 text-29xl">
          {gameInfo?.user1.username}&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;{gameInfo?.user2.username}<br />
          Score: {user1Score} vs {user2Score}<br />
          <br />
          Game settings:<br />
            point: {gameInfo?.gameSettings.points}<br />
            isSpeedUp: {gameInfo?.gameSettings.isSpeedUp ? 'true' : 'false'}<br />
          <GameCanvasComponent/>
        </div>
      </div>
    </GameBackground>
  );
};

export default GamePlayingUI;
