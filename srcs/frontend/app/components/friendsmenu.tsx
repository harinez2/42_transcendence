"use client";

import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";
import MAddFriend from "./m-add-friend";
import ModalPopup from "./modal-popup";
import { useState, useCallback } from "react";
import Image from "next/image";

type FriendsMenuType = {
  /** Style props */
  allPosition?: Property.Position;
  allTop?: Property.Top;
  allLeft?: Property.Left;
  blockedCursor?: Property.Cursor;
  blockedBorder?: Property.Border;
  blockedPadding?: Property.Padding;
  blockedBackgroundColor?: Property.BackgroundColor;
  addFriendCursor?: Property.Cursor;
  addFriendBorder?: Property.Border;
  addFriendPadding?: Property.Padding;
  addFriendBackgroundColor?: Property.BackgroundColor;

  /** Action props */
  onBlockedClick?: () => void;
};

const FriendsMenu: NextPage<FriendsMenuType> = ({
  allPosition,
  allTop,
  allLeft,
  blockedCursor,
  blockedBorder,
  blockedPadding,
  blockedBackgroundColor,
  addFriendCursor,
  addFriendBorder,
  addFriendPadding,
  addFriendBackgroundColor,
  onBlockedClick,
}) => {
  const [isMAddFriendOpen, setMAddFriendOpen] = useState(false);

  const openMAddFriend = useCallback(() => {
    setMAddFriendOpen(true);
  }, []);

  const closeMAddFriend = useCallback(() => {
    setMAddFriendOpen(false);
  }, []);

  const friendsStyle: CSS.Properties = useMemo(() => {
    return {
      position: allPosition,
      top: allTop,
      left: allLeft,
    };
  }, [allPosition, allTop, allLeft]);

  const blockedStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: blockedCursor,
      border: blockedBorder,
      padding: blockedPadding,
      backgroundColor: blockedBackgroundColor,
    };
  }, [blockedCursor, blockedBorder, blockedPadding, blockedBackgroundColor]);

  const addFriendStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: addFriendCursor,
      border: addFriendBorder,
      padding: addFriendPadding,
      backgroundColor: addFriendBackgroundColor,
    };
  }, [
    addFriendCursor,
    addFriendBorder,
    addFriendPadding,
    addFriendBackgroundColor,
  ]);

  return (
    <>
      <div className="absolute left-[0px] top-[0px] h-[47px] w-[500px] text-darkgray-300">
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
