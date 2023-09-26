"use client";

import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useMemo } from "react";
import CSS from "csstype";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ProfileContext } from "../layout";
import { ProfileType, UserType } from "../types";
import makeAPIRequest from "../api/api";

const HeaderMenu: NextPage = () => {
  const router = useRouter();
  const profile: ProfileType = useContext(ProfileContext);

  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>(
    `http://localhost:3000/api/users/avatar/${profile.userId}`,
  );
  const [timer, setTimer] = useState<number>(0);

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
    router.push("/game");
  }, [router]);

  const onFtTranscendenceClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  useEffect(() => {
    if (profile?.userId) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            setUser(result.data);
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
            if (user?.avatar) {
              setIcon(
                `http://localhost:3000/api/users/avatar/${profile.userId}`,
              );
            }
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [timer]);

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
        className="absolute right-[30px] top-[calc(50%_-_22px)] h-[45px] w-[45px] rounded-full"
        alt=""
        src={icon}
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
