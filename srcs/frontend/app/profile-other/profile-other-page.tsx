"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderMenu from "../components/headermenu";
import RankingContainer from "../components/raking-container";
import MatchHistoryContainer from "../components/match-history-container";

const ProfileOtherPage: NextPage = () => {
  const router = useRouter();

  const onDMClick = useCallback(() => {
    router.push("/dm");
  }, [router]);

  const onInviteToGameClick = useCallback(() => {
    router.push("/game-settings");
  }, [router]);

  return (
    <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-xl text-base-white font-body">
     <HeaderMenu/>
      <div className="absolute top-[200px] left-[481px] tracking-[0.1em]">
        Profile
      </div>
      <img
        className="absolute top-[242.5px] left-[470px] w-[500px] h-[5px]"
        alt=""
        src="/line-1.svg"
      />
            <div className="absolute top-[283px] left-[492px] w-[439px] h-[45px] overflow-hidden flex flex-row items-center justify-start gap-[227px] text-17xl">
        <div className="w-[177px] h-[45px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[27px]">
          <img
          className="relative w-[45px] h-[45px]"
          alt=""
          src="/icon5.svg"
          />
          <div className="relative tracking-[0.1em]">
          user2
          </div>
          <div className="absolute top-[294px] left-[868px] text-5xl tracking-[0.1em] text-silver-300">
          online
          </div>
        </div>
      </div>

 
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[383px] left-[473px] w-[75px] h-[39.29px]"
        onClick={onDMClick}
      >
        <div className="absolute top-[0px] left-[0px] bg-gray-400 w-[75px] h-[39.29px]" />
        <div className="absolute top-[8px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[51px] h-[31px]">
          DM
        </div>
      </button>
      
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[383px] left-[568px] w-[159px] h-[42px]">
        <div className="absolute top-[0px] left-[0px] bg-gray-400 w-[159px] h-[39.29px]" />
        <div className="absolute top-[8px] left-[12.59px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[150px] h-[34px]">
          Add friend
        </div>
      </button>

      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[383px] left-[749px] w-[221px] h-[42px]"
        onClick={onInviteToGameClick}
      >
        <div className="absolute top-[0px] left-[0px] bg-gray-400 w-[221px] h-[39.29px]" />
        <div className="absolute top-[8px] left-[19.5px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[201.5px] h-[34px]">
          Invite to Game
        </div>
      </button>
        <img
          className="absolute top-[473px] left-[470px] w-[500px] h-0.5"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer/>
        <img
          className="absolute top-[768px] left-[470px] w-[500px] h-0.5"
          alt=""
          src="/line-2.svg"
        />
      <MatchHistoryContainer/>

    </div>
  );
};

export default ProfileOtherPage;
