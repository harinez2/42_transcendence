"use client";

import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";
import MUserOps from "../components/modal/m-user-ops";
import ModalPopup from "../components/modal/modal-popup";
import { useState, useCallback } from "react";
import FriendsMenu from "../components/friendsmenu";

type FriendsListType = {
  icon2?: string;
  icon3?: string;
  icon4?: string;

  /** Style props */
  friendsPosition?: Property.Position;
  friendsTop?: Property.Top;
  friendsLeft?: Property.Left;
  iconCursor?: Property.Cursor;

  onBlockedClick?: () => void;
};

const FriendsList: NextPage<FriendsListType> = ({
  icon2,
  icon3,
  icon4,
  friendsPosition,
  friendsTop,
  friendsLeft,
  iconCursor,
  onBlockedClick,
}) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  const iconStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: iconCursor,
    };
  }, [iconCursor]);

  const friendsStyle: CSS.Properties = useMemo(() => {
    return {
      position: friendsPosition,
      top: friendsTop,
      left: friendsLeft,
    };
  }, [friendsPosition, friendsTop, friendsLeft]);

  return (
    <>
      <div
        className="relative h-[370px] w-[500px] text-left font-body text-xl text-white"
        style={friendsStyle}
      >
        <FriendsMenu
          allPosition="absolute"
          allTop="327px"
          allLeft="470px"
          blockedCursor="pointer"
          blockedBorder="none"
          blockedPadding="0"
          blockedBackgroundColor="transparent"
          addFriendCursor="pointer"
          addFriendBorder="none"
          addFriendPadding="0"
          addFriendBackgroundColor="transparent"
          onBlockedClick={onBlockedClick}
        />

        <div className="absolute left-[0px] top-[84px] h-[75px] w-[500px]">
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
            style={iconStyle}
            onClick={openMUserOps}
          />
        </div>
        <div className="absolute left-[0px] top-[189px] h-[75px] w-[500px]">
          <div className="absolute left-[80px] top-[0px] tracking-[0.1em]">
            user3
          </div>
          <img
            className="absolute left-[21px] top-[0px] h-[45px] w-[45px]"
            alt=""
            src={icon3}
            style={iconStyle}
            onClick={openMUserOps}
          />
          <img
            className="absolute left-[0px] top-[73px] h-0.5 w-[500px]"
            alt=""
            src="/line-2.svg"
          />
        </div>
        <div className="absolute left-[0px] top-[295px] h-[75px] w-[500px]">
          <div className="absolute left-[80px] top-[0px] tracking-[0.1em]">
            user4
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
            className="absolute left-[21px] top-[1px] h-[45px] w-[45px] overflow-hidden"
            alt=""
            src={icon4}
            style={iconStyle}
            onClick={openMUserOps}
          />
        </div>
      </div>
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
