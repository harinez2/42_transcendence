"use client";

import { useContext, useEffect } from "react";
import MUserOps from "../../../components/modal/m-user-ops";
import ModalPopup from "../../../components/modal/modal-popup";
import { useState, useCallback } from "react";
import { ProfileType } from "@/app/types";
import { ProfileContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { FolloweeType } from "./types";

const FriendComponent = ({ followee }: {
  followee: FolloweeType;
}
  ) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  return (
    <>
      <li>
        <a
          href="#"
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        >
          <img
            src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
            onClick={openMUserOps}
            cursor-pointer
          /> 
          <span className="ml-3 shrink-0 pr-8 text-xl">
            {followee.username}
          
          </span>
        </a>
      </li>
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

const FriendsList = () => {
  const profile: ProfileType = useContext(ProfileContext);
  const [followees, setFollowees] = useState<FolloweeType[]>([]);

  useEffect(() => {
    if (profile.userId != "") {
      // friends一覧を取得
      makeAPIRequest<FolloweeType[]>("get", `/friends/follow/followees/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            setFollowees(result.data);;
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]); // has to change it to update the list

  return (
    <>
      <div
        className="absolute left-[470px] top-[400px] text-left font-body text-xl overflow-y-auto text-white"
      >
        {/* className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform" */}
        
        {/* <div className="relative h-full bg-darkslategray-100 px-3 py-4">   */}
          {/* check color/ */}

      <ul className="divide-y divide-gray-500/30">
        {followees?.map((followee) => (
          <FriendComponent
            key={followee.id}
            followee={followee}
          />
        ))}
        </ul> 
      

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
    </>
  );
};

export default FriendsList;
