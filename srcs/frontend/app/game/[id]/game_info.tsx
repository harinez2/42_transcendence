"use client";

import React from "react";
import { GameInfoType } from "../types";

const GameInfoComponent = ({
  gameInfo,
  user1Score,
  user2Score,
}: {
  gameInfo: GameInfoType | undefined;
  user1Score: number;
  user2Score: number;
}) => {
  return (
    <>
      {gameInfo?.user1.username}&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;
      {gameInfo?.user2.username}
      <br />
      Score: {user1Score} vs {user2Score}
      <br />
      <br />
      Game settings:
      <br />
      point: {gameInfo?.gameSettings.points}
      <br />
      isSpeedUp: {gameInfo?.gameSettings.isSpeedUp ? "true" : "false"}
      <br />
    </>
  );
};

export default GameInfoComponent;
