"use client";

import React from "react";
import { useMemo } from "react";
import CSS, { Property } from "csstype";
import MAddFriend from "./modal/m-add-friend";
import ModalPopup from "./modal/modal-popup";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const FriendsMenu = () => {
  const router = useRouter();

  const onBlockedClick = useCallback(() => {
    router.push("/profile/me/blocked");
  }, [router]);

  const [isMAddFriendOpen, setMAddFriendOpen] = useState(false);

  const openMAddFriend = useCallback(() => {
    setMAddFriendOpen(true);
  }, []);

  const closeMAddFriend = useCallback(() => {
    setMAddFriendOpen(false);
  }, []);

  const blockedStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  const addFriendStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: "pointer",
      border: "none",
      padding: "0",
      backgroundColor: "transparent",
    };
  }, ["pointer", "none", "0", "transparent"]);

  return (
    <>
      <div className="absolute left-[470px] top-[327px] h-[47px] w-[500px] font-body text-xl text-darkgray-300">
        <img
          className="absolute left-[0px] top-[44.5px] h-[5px] w-[500px]"
          alt=""
          src="/line-1.svg"
        />
        <div className="absolute left-[67px] top-[0px] h-[23px] w-[27px] text-white">
          <div className="absolute bottom-[-17.39%] left-[-166.67%] right-[-174.07%] top-[-21.74%] h-[139.13%] w-[440.74%] bg-dimgray-100" />
          <div className="absolute left-[0%] top-[0%] tracking-[0.1em]">
            All
          </div>
        </div>
        <div
          className="absolute left-[202px] top-[0px] tracking-[0.1em]"
          style={blockedStyle}
          onClick={onBlockedClick}
        >
          Blocked
        </div>
        <div
          className="absolute left-[351px] top-[0px] tracking-[0.1em]"
          style={addFriendStyle}
          onClick={openMAddFriend}
        >
          add friend
        </div>
      </div>
      {isMAddFriendOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMAddFriend}
        >
          <MAddFriend onClose={closeMAddFriend} />
        </ModalPopup>
      )}
    </>
  );
};

export default FriendsMenu;
