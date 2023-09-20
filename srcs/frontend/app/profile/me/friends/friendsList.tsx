"use client";

import type { NextPage } from "next";
import { useContext, useEffect, useMemo } from "react";
import CSS, { Property } from "csstype";
import MUserOps from "../../../components/modal/m-user-ops";
import ModalPopup from "../../../components/modal/modal-popup";
import { useState, useCallback } from "react";
import { ProfileType } from "@/app/types";
import { ProfileContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { FriendsType } from "./types";

const FriendComponent = ({
  profile,
  friend,
}: {
  profile: ProfileType;
  friend: FriendsType;
  // friends: FriendsType;
}) => {
  const user_name = friend.username; //
  const user_status = friend.status;

  return (
    <>
      <li>
        <a
          href="#"
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        >
          {/* <img
            // src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
            onClick={openMUserOps}
            cursor-pointer
          /> */}
          <span className="ml-3 shrink-0 pr-8 text-xl">{user_name}
          {user_status}
          </span>
        </a>
      </li>
    </>
  );
};

const FriendsList = () => {

  const profile: ProfileType = useContext(ProfileContext);
  const [friends, setFriends] = useState<FriendsType[]>([]);

  useEffect(() => {
    if (profile.userId != "") {
      // friends一覧を取得
      makeAPIRequest<FriendsType[]>("get", `/friends/follow/followees/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            setFriends(result.data);
            console.log("check");
            console.log(friends);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  return (
    <>
      <div
        className="absolute left-[470px] top-[400px] text-left font-body text-xl overflow-y-auto text-white"
      >

        {/* className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform" */}
        
        {/* <div className="relative h-full bg-darkslategray-100 px-3 py-4">   */}
          {/* check color/ */}

      {/* <ul className="divide-y divide-gray-500/30">
        {friends?.map((c) => (
          <FriendComponent
            // key={c.channelId} // ??
            profile={profile}
            friend={c}
            //{openMUserOps}
            //imageのモーダル
          />
        ))}
          </ul> */}
        


        {/* <div className="absolute left-[0px] top-[84px] h-[75px] w-[500px]">
          <div className="absolute left-[80px] top-[0px] tracking-[0.1em]">
            user2
          </div>
          <div className="absolute left-[80px] top-[23px] tracking-[0.1em] text-darkgray-200">
            Online
          </div>
          <img
            className="absolute left-[0px] top-[73px] h-0.5 w-[500px]"
            alt=""
            src="/line-2.svg"
          />
          <img
            className="absolute left-[21px] top-[0px] h-[45px] w-[45px]"
            alt=""
            src={icon2}
            onClick={openMUserOps}
          /> */}
        </div>
      {/* </div> */}
      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps onClose={closeMUserOps} />
        </ModalPopup>
      )}
    </>
  );
};

export default FriendsList;
