"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderMenu from "../components/headermenu";
import FriendsList from "./friendsList";

const Friends: NextPage = () => {
  const router = useRouter();

  const onMyIconClick = useCallback(() => {
    router.push("/profile-mine");
  }, [router]);

  const onFriendsClick = useCallback(() => {
    router.push("/friends");
  }, [router]);

  const onDMClick = useCallback(() => {
    router.push("/dm");
  }, [router]);

  const onGameClick = useCallback(() => {
    router.push("/game-match-making-parent");
  }, [router]);

  const onFtTranscendenceClick = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const onBlockedClick = useCallback(() => {
    router.push("/friends-blocked");
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-darkslategray-100">
      <HeaderMenu
        icon1="/icon1.svg"
        headerMenuPosition="absolute"
        headerMenuTop="0px"
        headerMenuLeft="0px"
        iconCursor="pointer"
        friendsCursor="pointer"
        friendsBorder="none"
        friendsPadding="0"
        friendsBackgroundColor="transparent"
        dMCursor="pointer"
        dMBorder="none"
        dMPadding="0"
        dMBackgroundColor="transparent"
        gameCursor="pointer"
        gameBorder="none"
        gamePadding="0"
        gameBackgroundColor="transparent"
        ftTranscendenceCursor="pointer"
        ftTranscendenceBorder="none"
        ftTranscendencePadding="0"
        ftTranscendenceBackgroundColor="transparent"
        headerMenuWidth="100%"
        headerMenuRight="0px"
        onIconClick={onMyIconClick}
        onFriendsClick={onFriendsClick}
        onDMClick={onDMClick}
        onGameClick={onGameClick}
        onFtTranscendenceClick={onFtTranscendenceClick}
      />
      <FriendsList
        icon2="/icon2.svg"
        icon3="/icon3.svg"
        icon4="/icon4.svg"
        friendsPosition="absolute"
        friendsTop="327px"
        friendsLeft="470px"
        iconCursor="pointer"
        onBlockedClick={onBlockedClick}
      />
    </div>
  );
};

export default Friends;
