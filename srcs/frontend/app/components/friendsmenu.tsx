"use client";

import React from 'react';
import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";
import MAddFriend from "./modal/m-add-friend";
import ModalPopup from "./modal/modal-popup";
import { useState, useCallback } from "react";

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
      <div className="absolute top-[0px] left-[0px] w-[500px] h-[47px] text-darkgray-300">
        <img
          className="absolute top-[44.5px] left-[0px] w-[500px] h-[5px]"
          alt=""
          src="/line-1.svg"
        />
        <div className="absolute top-[0px] left-[67px] w-[27px] h-[23px] text-white">
          <div className="absolute h-[139.13%] w-[440.74%] top-[-21.74%] right-[-174.07%] bottom-[-17.39%] left-[-166.67%] bg-dimgray-100" />
          <div className="absolute top-[0%] left-[0%] tracking-[0.1em]">
            All
          </div>
        </div>
        <div
          className="absolute top-[0px] left-[202px] tracking-[0.1em]"
          style={blockedStyle}
          onClick={onBlockedClick}
        >
          Blocked
        </div>
        <div
          className="absolute top-[0px] left-[351px] tracking-[0.1em]"
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