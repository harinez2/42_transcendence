"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameBackground from "../../components/game-background";
import GameCanvasComponent from "./game_canvas";
import { ErrorContext, SocketContext } from "@/app/layout";

const GamePlayingUI = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const socket: any = useContext(SocketContext);
  const error: any = useContext(ErrorContext);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    socket?.emit("game-join");
  }, [socket]);

  return (
    <GameBackground user1="" user2="">
      <div className="flex h-screen items-center justify-center">
        <div className="ml-3 shrink-0 pr-8 text-29xl">
          game id: {params.id}
          <br />
        </div>
        <GameCanvasComponent />
      </div>
    </GameBackground>
  );
};

export default GamePlayingUI;
