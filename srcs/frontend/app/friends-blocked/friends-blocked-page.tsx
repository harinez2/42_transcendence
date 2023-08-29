"use client";

import type { NextPage } from "next";
import { useState, useCallback } from "react";
import MAddFriend from "../components/modal/m-add-friend";
import PortalPopup from "../components/modal/portal-popup";
import { useRouter } from "next/navigation";
import HeaderMenu from "../components/headermenu";
import FriendsBlockedList from "./friends-blocked-list";

const FriendsBlockedPage: NextPage = () => {
  const [isMAddFriendPopupOpen, setMAddFriendPopupOpen] = useState(false);
  const router = useRouter();

  const onAllClick = useCallback(() => {
    router.push("/friends");
  }, [router]);

  const openMAddFriendPopup = useCallback(() => {
    setMAddFriendPopupOpen(true);
  }, []);

  const closeMAddFriendPopup = useCallback(() => {
    setMAddFriendPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative bg-darkslategray-100 w-full h-screen overflow-hidden text-left text-5xl text-base-white font-body">
       <HeaderMenu />
        <div className="absolute top-[327px] left-[470px] w-[500px] h-screen text-xl">
          <div className="absolute top-[-5px] left-[calc(50%_-_250px)] w-[500px] h-[52px]">
            <img
              className="absolute top-[49.5px] left-[calc(50%_-_250px)] w-[500px] h-[5px]"
              alt=""
              src="/line-1.svg"
            />
            <button
              className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[5px] left-[calc(50%_-_183px)] text-xl tracking-[0.1em] font-body text-darkgray-300 text-left inline-block"
              onClick={onAllClick}
            >
              All
            </button>
            <div className="absolute top-[0px] left-[calc(50%_-_68px)] bg-dimgray-100 w-[119px] h-8" />
            <div className="absolute top-[5px] left-[calc(50%_-_48px)] tracking-[0.1em]">
              Blocked
            </div>
            <button
              className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[5px] left-[calc(50%_+_101px)] text-xl tracking-[0.1em] font-body text-darkgray-300 text-left inline-block"
              onClick={openMAddFriendPopup}
            >
              add friend
            </button>
          </div>
          <FriendsBlockedList/>
        </div>
        </div>
      {isMAddFriendPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMAddFriendPopup}
        >
          <MAddFriend onClose={closeMAddFriendPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default FriendsBlockedPage;
