"use client";

import type { NextPage } from "next";
import HeaderMenu from "../../../components/headermenu";
import FriendsList from "./friendsList";
import FriendsMenu from "@/app/components/friendsmenu";

const FriendsPage = () => {
  return (
    <div className="relative h-screen w-full overflow-auto bg-darkslategray-100">
      <HeaderMenu />
        <FriendsMenu />
        <FriendsList />
      </div>
  );
};

export default FriendsPage;
