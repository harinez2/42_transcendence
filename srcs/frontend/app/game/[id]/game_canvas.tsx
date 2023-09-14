"use client";

import { SocketContext } from "@/app/layout";
import { Position } from "../types";
import React, { useContext, useEffect, useState } from "react";

// キャンバス
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 600;
// パドル
const PADDLE_HEIGHT = CANVAS_HEIGHT / 4.5;
const PADDLE_WIDTH = PADDLE_HEIGHT / 9.5;
const L_PADDLE_X = PADDLE_WIDTH * 2.5; // 左パドルの左端
const R_PADDLE_X = CANVAS_WIDTH - PADDLE_WIDTH * 2.5 - PADDLE_WIDTH; // 右パドルの左端
const START_PADDLE_Y = CANVAS_HEIGHT / 2.0 - PADDLE_HEIGHT / 2.0;
// ボール
const BALL_SIZE = PADDLE_WIDTH * 1.5;
// インターバル
const TIMER_INTERVAL = 120;

// パドル
const paddleSpeed = 20;
// 操作キー
const upKey = "w";
const downKey = "s";
// キーのイベントリスナ
const keydownEvent = "keydown";
const keyupEvent = "keyup";

const GameCanvasComponent = ({
  gameId,
  isUser1,
}: {
  gameId: number;
  isUser1: boolean;
}) => {
  const socket: any = useContext(SocketContext);

  const [ballPos, setBallPos] = useState<Position>({
    x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
    y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
  });
  const [lPaddlePos, setLPaddlePos] = useState<Position>({
    x: L_PADDLE_X,
    y: START_PADDLE_Y,
  });
  const [rPaddlePos, setRPaddlePos] = useState<Position>({
    x: R_PADDLE_X,
    y: START_PADDLE_Y,
  });

  const setLPaddleY = (newPaddleY: number) => {
    setLPaddlePos((prev) => ({
      x: prev.x,
      y: newPaddleY,
    }));
  };
  const setRPaddleY = (newPaddleY: number) => {
    setRPaddlePos((prev) => ({
      x: prev.x,
      y: newPaddleY,
    }));
  };

  const clearCanvas = (ctx: any) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const drawCanvasBackground = (ctx: any) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const drawBall = (ctx: any) => {
    ctx.fillStyle = "white";
    ctx.fillRect(ballPos.x, ballPos.y, BALL_SIZE, BALL_SIZE);
  };

  const drawPaddle = (ctx: any, paddlePos: Position) => {
    ctx.fillStyle = "white";
    ctx.fillRect(paddlePos.x, paddlePos.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  };

  const drawCanvas = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      clearCanvas(ctx);
      drawCanvasBackground(ctx);
      drawBall(ctx);
      drawPaddle(ctx, lPaddlePos);
      drawPaddle(ctx, rPaddlePos);
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

  const postMyPaddleY = async (userNum: number, mypaddley: number) => {
    await new Promise(() => {
      socket?.emit("game-post_paddle_y", {
        paddleY: mypaddley,
        user: userNum,
        gameId: gameId,
      });
    });
  };

  const moveMyPaddle = () => {
    if (isPressingUp && !isPressingDown) {
      // upキー押下時
      if (isUser1 && 0 <= lPaddlePos.y - paddleSpeed) {
        postMyPaddleY(1, lPaddlePos.y - paddleSpeed);
      } else if (!isUser1 && 0 <= rPaddlePos.y - paddleSpeed) {
        postMyPaddleY(2, rPaddlePos.y - paddleSpeed);
      }
    } else if (!isPressingUp && isPressingDown) {
      // downキー押下時
      if (
        isUser1 &&
        lPaddlePos.y + paddleSpeed + PADDLE_HEIGHT < CANVAS_HEIGHT
      ) {
        postMyPaddleY(1, lPaddlePos.y + paddleSpeed);
      } else if (
        !isUser1 &&
        rPaddlePos.y + paddleSpeed + PADDLE_HEIGHT < CANVAS_HEIGHT
      ) {
        postMyPaddleY(2, rPaddlePos.y + paddleSpeed);
      }
    }
  };

  // 一定時間おきに再描画
  const interval = setInterval(async () => {
    setFrameCnt(frameCnt + 1);
  }, TIMER_INTERVAL);

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
      setLPaddleY(data.lPaddleY);
      setRPaddleY(data.rPaddleY);
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
      width={CANVAS_WIDTH.toString()}
      height={CANVAS_HEIGHT.toString()}
    ></canvas>
  );
};

export default GameCanvasComponent;
