"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import HeaderMenu from "../components/headermenu";
import FriendsList from "./friendsList";

const FriendsPage: NextPage = () => {
  const router = useRouter();

  const onBlockedClick = useCallback(() => {
    router.push("/friends-blocked");
  }, [router]);

  return (
    <div className="bg-darkslategray-100 relative h-screen w-full overflow-hidden">
      <HeaderMenu/>
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

export default FriendsPage;
