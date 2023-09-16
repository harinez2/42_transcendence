import React from "react";
import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const HeaderMenu: NextPage = () => {
  const router = useRouter();

  const onMyIconClick = useCallback(() => {
    router.push("/profile/me");
  }, [router]);

  const onFriendsClick = useCallback(() => {
    router.push("/profile/me/friends");
  }, [router]);

  const onDMClick = useCallback(() => {
    router.push("/dm");
  }, [router]);

  const onGameClick = useCallback(() => {
    router.push("/game/preparing/match-making-parent");
  }, [router]);

  const onFtTranscendenceClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const headerMenuStyle: CSS.Properties = useMemo(() => {
    return {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      right: "0px",
    };
  }, ["absolute", "0px", "0px", "100%", "0px"]);

  const iconStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
    };
  }, ["pointer"]);

  const friendsStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  const dMStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  const gameStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  const ftTranscendenceStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  return (
    <div
      className="relative h-[100px] w-[1440px] text-left font-body text-5xl text-white"
      style={headerMenuStyle}
    >
      <div className="absolute inset-x-0 top-[calc(50%_-_50px)] h-[100px] w-full bg-darkslategray-300" />
      <img
        className="absolute right-[30px] top-[calc(50%_-_22px)] h-[45px] w-[45px]"
        alt=""
        src={"/icon1.svg"}
        style={iconStyle}
        onClick={onMyIconClick}
      />
      <div className="absolute right-[138px] top-[calc(50%_-_5px)] h-[29px] w-[279px]">
        <div
          className="absolute right-[190px] top-[calc(50%_-_13.5px)] tracking-[0.1em]"
          style={friendsStyle}
          onClick={onFriendsClick}
        >
          friends
        </div>
        <div
          className="absolute right-[109px] top-[calc(50%_-_13.5px)] tracking-[0.1em]"
          style={dMStyle}
          onClick={onDMClick}
        >
          DM
        </div>
        <div
          className="absolute right-[0px] top-[calc(50%_-_14.5px)] tracking-[0.1em]"
          style={gameStyle}
          onClick={onGameClick}
        >
          game
        </div>
      </div>
      <div
        className="absolute left-[37px] top-[calc(50%_-_26px)] text-29xl tracking-[0.1em]"
        style={ftTranscendenceStyle}
        onClick={onFtTranscendenceClick}
      >
        ft_transcendence
      </div>
    </div>
  );
};

export default HeaderMenu;
