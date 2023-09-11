"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderMenu from "../../../components/headermenu";
import RankingContainer from "../../../components/raking-container";
import MatchHistoryContainer from "../../../components/match-history-container";
import React from "react";

function ProfileOtherPage({userId}: any) {
  console.log(userId);
  
  const router = useRouter();

  const onDMClick = useCallback(() => {
    router.push("/dm");
  }, [router]);

  const onInviteToGameClick = useCallback(() => {
    router.push("../../game/settings");
  }, [router]);

try {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100 text-left font-body text-xl text-base-white">
      <HeaderMenu />
      <div className="absolute left-[481px] top-[200px] tracking-[0.1em]">
        Profile
      </div>
      <img
        className="absolute left-[470px] top-[242.5px] h-[5px] w-[500px]"
        alt=""
        src="/line-1.svg"
      />
      <div className="absolute left-[492px] top-[283px] flex h-[45px] w-[439px] flex-row items-center justify-start gap-[227px] overflow-hidden text-17xl">
        <div className="flex h-[45px] w-[177px] shrink-0 flex-row items-center justify-start gap-[27px] overflow-hidden">
          <img className="relative h-[45px] w-[45px]" alt="" src="/icon5.svg" />
          <div className="relative tracking-[0.1em]">user2</div>
          <div className="absolute left-[868px] top-[294px] text-5xl tracking-[0.1em] text-silver-300">
            online
          </div>
        </div>
      </div>

      <button
        className="absolute left-[473px] top-[383px] h-[39.29px] w-[75px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onDMClick}
      >
        <div className="absolute left-[0px] top-[0px] h-[39.29px] w-[75px] bg-gray-400" />
        <div className="absolute left-[16px] top-[8px] inline-block h-[31px] w-[51px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          DM
        </div>
      </button>

      <button className="absolute left-[568px] top-[383px] h-[42px] w-[159px] cursor-pointer bg-[transparent] p-0 [border:none]">
        <div className="absolute left-[0px] top-[0px] h-[39.29px] w-[159px] bg-gray-400" />
        <div className="absolute left-[12.59px] top-[8px] inline-block h-[34px] w-[150px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Add friend
        </div>
      </button>

      <button
        className="absolute left-[749px] top-[383px] h-[42px] w-[221px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onInviteToGameClick}
      >
        <div className="absolute left-[0px] top-[0px] h-[39.29px] w-[221px] bg-gray-400" />
        <div className="absolute left-[19.5px] top-[8px] inline-block h-[34px] w-[201.5px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
          Invite to Game
        </div>
      </button>
      <img
        className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
        alt=""
        src="/line-2.svg"
      />
      <RankingContainer userId={userId}/>
      <img
        className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
        alt=""
        src="/line-2.svg"
      />
      <MatchHistoryContainer userId={userId}/>
    </div>
  );
  } catch (error) {
        console.error("Error fetching profile:", error);
        return <div>Error loading profile.</div>
      }
}

export default ProfileOtherPage;