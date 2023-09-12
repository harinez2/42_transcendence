import { ErrorContext, SocketContext } from "@/app/layout";
import { Position } from "../types";
import React, { useContext, useEffect, useState } from "react";

// キャンバス
const canvasHeight = 400;
const canvasWidth = 600;
// パドル
const paddleHeight = canvasHeight / 4.5;
const paddleWidth = paddleHeight / 9.5;
const lPaddleX = paddleWidth * 2.5;
const rPaddleX = canvasWidth - paddleWidth * 2.5 - paddleWidth;
const startPaddleY = canvasHeight / 2.0 - paddleHeight / 2.0;
const paddleSpeed = 20;
// ボール
const ballSize = paddleWidth * 1.5;
// インターバル
const timerInterval = 120;
// 操作キー
const upKey = "w";
const downKey = "s";
// キーのイベントリスナ
const keydownEvent = "keydown";
const keyupEvent = "keyup";

const GameCanvasComponent = ({ gameId }: { gameId: number }) => {
  const socket: any = useContext(SocketContext);
  const error: any = useContext(ErrorContext);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  const [ballPos, setBallPos] = useState<Position>({
    x: canvasWidth / 2 - ballSize / 2,
    y: canvasHeight / 2 - ballSize / 2,
  });
  const [myPaddlePos, setMyPaddlePos] = useState<Position>({
    x: lPaddleX,
    y: startPaddleY,
  });
  const [oppPaddlePos, setOppPaddlePos] = useState<Position>({
    x: rPaddleX,
    y: startPaddleY,
  });

  const setMyPaddleY = (newPaddleY: number) => {
    setMyPaddlePos((prev) => ({
      x: prev.x,
      y: newPaddleY,
    }));
  };
  const setOppPaddleY = (newPaddleY: number) => {
    setOppPaddlePos((prev) => ({
      x: prev.x,
      y: newPaddleY,
    }));
  };

  const clearCanvas = (ctx: any) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  const drawCanvasBackground = (ctx: any) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const drawBall = (ctx: any) => {
    ctx.fillStyle = "white";
    ctx.fillRect(ballPos.x, ballPos.y, ballSize, ballSize);
  };

  const drawPaddle = (ctx: any, paddlePos: Position) => {
    ctx.fillStyle = "white";
    ctx.fillRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight);
  };

  const drawCanvas = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      clearCanvas(ctx);
      drawCanvasBackground(ctx);
      drawBall(ctx);
      drawPaddle(ctx, myPaddlePos);
      drawPaddle(ctx, oppPaddlePos);
    }
  };

  const [isPressingUp, setPressingUp] = useState(false);
  const [isPressingDown, setPressingDown] = useState(false);
  const [frameCnt, setFrameCnt] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === upKey) {
      setPressingUp(true);
    }
    if (e.key === downKey) {
      setPressingDown(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === upKey) {
      setPressingUp(false);
    }
    if (e.key === downKey) {
      setPressingDown(false);
    }
  };

  const postMyPaddleY = async (mypaddley: number) => {
    await new Promise(() => {
      socket?.emit("game-post_paddle_y", {
        paddleY: mypaddley,
        user: 1,
        gameId: gameId,
      });
    });
  };

  const moveMyPaddle = () => {
    if (isPressingUp && !isPressingDown && 0 <= myPaddlePos.y - paddleSpeed) {
      // upキー押下時
      postMyPaddleY(myPaddlePos.y - paddleSpeed);
    } else if (
      !isPressingUp &&
      isPressingDown &&
      myPaddlePos.y + paddleSpeed + paddleHeight < canvasHeight
    ) {
      // downキー押下時
      postMyPaddleY(myPaddlePos.y + paddleSpeed);
    }
  };

  // 一定時間おきに再描画
  const interval = setInterval(async () => {
    setFrameCnt(frameCnt + 1);
  }, timerInterval);

  useEffect(() => {
    // キーイベントの設定
    document.addEventListener(keydownEvent, handleKeyDown);
    document.addEventListener(keyupEvent, handleKeyUp);
    return () => {
      document.removeEventListener(keydownEvent, handleKeyDown);
      document.removeEventListener(keyupEvent, handleKeyUp);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // ボールとパドルの位置を受け取る
    socket?.on("game-update_canvas", (data: any) => {
      setBallPos(data.ballPos);
      setMyPaddleY(data.lPaddleY);
      setOppPaddleY(data.rPaddleY);
    });
    return () => {
      socket?.off("game-update_canvas");
    };
  }, [socket]);

  useEffect(() => {
    moveMyPaddle();
    drawCanvas();
  }, [frameCnt]);

  return (
    <canvas
      id="canvas"
      width={canvasWidth.toString()}
      height={canvasHeight.toString()}
    ></canvas>
  );
};

export default GameCanvasComponent;
