"use client";

import type { NextPage } from "next";
import HeaderMenu from "../../../components/headermenu";
import FriendsList from "./friendsList";
import FriendsMenu from "@/app/components/friendsmenu";

const FriendsPage = () => {
  return (
    <div className="relative h-screen w-full overflow-auto bg-darkslategray-100">
      <HeaderMenu />
      {/* <div className="absolute left-[470px] top-[327px] h-screen w-[500px] text-xl"> */}
        <FriendsMenu />
        <FriendsList />
        {/* </div> */}
{/* 
              {profile != null && (
          <UserListComponent
            profile={profile}
            channels={channels}
            onSelectChannel={handleChannelSelect}
          />
        )} */}
      
    </div>
  );
};

export default FriendsPage;
