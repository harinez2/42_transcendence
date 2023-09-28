"use client";

import { useEffect, useState } from "react";
import { GameSummaryType, RankType } from "@/app/types";
import makeAPIRequest from "@/app/api/api";

function RankingContainer({ userId }: any) {
  const [gamesum, setGamesum] = useState<GameSummaryType>();
  const [totalUser, setTotalUser] = useState<number>(0);
  const [ranking, setRanking] = useState<RankType>();
  const [rank, setRank] = useState<number>(0);
  const [woncount, setWonCount] = useState<number>(0);
  const [lostcount, setLostCount] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      // ゲームの勝敗数を取得
      makeAPIRequest<GameSummaryType>("get", `/games/summary/user/${userId}`)
        .then((result) => {
          if (result.success) {
            setGamesum(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // ランキングを取得
      makeAPIRequest<RankType>("get", `/games/ranking/win/${userId}`)
        .then((result) => {
          if (result.success) {
            setRanking(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (ranking && gamesum) {
      setRank(ranking.rank);
      setTotalUser(ranking.totalUser);
      setWonCount(gamesum.wonCount);
      setLostCount(gamesum.lostCount);
    }
  }, [gamesum, ranking]);

  return (
    <div className="absolute left-[590px] top-[506px] h-[227px] w-[300px]">
      <div className="absolute left-[1px] top-[0px] flex h-14 w-[300px] flex-row items-center justify-start gap-[66px] overflow-hidden">
        <div className="relative tracking-[0.1em]">ranking</div>
        <div className="relative text-29xl tracking-[0.1em]">
          {rank}/{totalUser}
        </div>
      </div>
      <div className="absolute left-[5px] top-[83px] flex h-14 w-[300px] flex-row items-center justify-start gap-[118px] overflow-hidden">
        <div className="relative tracking-[0.1em]">win</div>
        <div className="relative text-29xl tracking-[0.1em]">{woncount}</div>
      </div>
      <div className="absolute left-[0px] top-[171px] flex h-14 w-[300px] flex-row items-center justify-start gap-[130px] overflow-hidden">
        <div className="mb-[11px] inline-block w-[34px] tracking-[0.1em]">
          lose
        </div>
        <div className="relative text-29xl tracking-[0.1em]">{lostcount}</div>
      </div>
    </div>
  );
}

export default RankingContainer;
