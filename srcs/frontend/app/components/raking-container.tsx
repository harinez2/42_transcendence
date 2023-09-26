"use client";

import { useEffect, useState } from "react";
import { GameSummaryType, UserType } from "./types";
import makeAPIRequest from "../api/api";

// eslint-disable-next-line no-unused-vars
function RankingContainer({ userId }: any) {
  const [users, setUsers] = useState<UserType[]>();
  const [gamesum, setGamesum] = useState<GameSummaryType>();
  const [players, setPlayers] = useState<GameSummaryType[]>([]);
  const [rank, setRank] = useState<number>(-1);
  const [count, setCount] = useState<number>(0);
  const [woncount, setWonCount] = useState<number>(0);
  const [lostcount, setLostCount] = useState<number>(0);

  useEffect(() => {
    // すべてのユーザー情報を取得
    makeAPIRequest<UserType[]>("get", `/users`)
      .then((result) => {
        if (result.success) {
          setUsers(result.data);
          if (users) {
            setCount(users.length);
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
    if (userId) {
      // ゲームの勝敗数を取得
      makeAPIRequest<GameSummaryType>("get", `/games/summary/user/${userId}`)
        .then((result) => {
          if (result.success) {
            setGamesum(result.data);
            if (gamesum) {
              setWonCount(gamesum.wonCount);
              setLostCount(gamesum.lostCount);
            }
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
    if (count) {
      // 全ユーザーのゲームサマリーを取得
      const fetchPlayers = async () => {
        const playerData: GameSummaryType[] = [];
        for (let i = 1; i <= count; i++) {
          makeAPIRequest<GameSummaryType>("get", `/games/summary/user/${i}`)
            .then((result) => {
              if (result.success) {
                playerData.push(result.data);
              } else {
                console.error(result.error);
              }
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }
        await setPlayers(playerData);
      };
      fetchPlayers();
    }
    console.log("players", players);
  }, [count]);

  useEffect(() => {
    if (players) {
      const getRanking = () => {
        players.sort((a, b) => b.wonCount - a.wonCount);
        for (let i = 0; i < players.length; i++) {
          if (players[i].userId === userId) {
            setRank(i + 1);
            break;
          }
        }
      };
      getRanking();
    }
  }, [players]);

  return (
    <div className="absolute left-[590px] top-[506px] h-[227px] w-[300px]">
      <div className="absolute left-[1px] top-[0px] flex h-14 w-[300px] flex-row items-center justify-start gap-[66px] overflow-hidden">
        <div className="relative tracking-[0.1em]">ranking</div>
        <div className="relative text-29xl tracking-[0.1em]">
          {rank}/{count}
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
