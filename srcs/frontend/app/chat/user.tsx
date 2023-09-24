"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import useModal from "../components/useModal";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Socket } from "socket.io-client";
import { ProfileType } from "../types";

export type User = {
  id: number;
  nickname: string;
  status: string;
};
export interface UserProps {
  user: User;
  router: AppRouterInstance;
  socket: Socket;
  profile: ProfileType;
}

const UserComponent = ({ user, router, socket, profile }: UserProps) => {
  const { ref, showModal, closeModal } = useModal();

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <div>
      <button
        onClick={showModal}
        className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
      >
        <Image
          src="http://localhost:3000/favicon.ico"
          className="h-auto max-w-full rounded-full"
          width={30}
          height={30}
          alt=""
        />
        <span className="ml-3 shrink-0 pr-8">{user.nickname}</span>
      </button>
      <dialog
        onClick={closeModal}
        ref={ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-gray-600 px-6 py-2"
      >
        <UserDialog
          closeModal={closeModal}
          stopPropagation={stopPropagation}
          user={user}
          router={router}
          socket={socket}
          profile={profile}
        />
      </dialog>
    </div>
  );
};

const onClickInviteToGame = (
  invitingUserId: number,
  router: AppRouterInstance,
  socket: Socket,
  profile: ProfileType,
) => {
  socket?.emit("game-invite", {
    myUserId: profile.userId,
    invitingUserId: invitingUserId,
  });
  router.push("/game/preparing");
};

// NOTE: User をクリックしたときに表示される dialog
const UserDialog = ({
  closeModal,
  stopPropagation,
  user,
  router,
  socket,
  profile,
}: any) => {
  return (
    // NOTE: dialog の中身
    <div onClick={stopPropagation} className="flex w-40 flex-col text-white">
      User ops
      <Link href="#" className="m-2 rounded-md bg-gray-500 px-2 text-white">
        See Profile
      </Link>
      <Link href="/dm" className="m-2 rounded-md bg-gray-500 px-2 text-white">
        Send DM
      </Link>
      <Link href="#" className="m-2 rounded-md bg-gray-500 px-2 text-white">
        Add Friend
      </Link>
      <button
        onClick={() => onClickInviteToGame(user.id, router, socket, profile)}
        className="m-2 rounded-md bg-gray-500 px-2 text-white"
      >
        <span className="x1 text-left">Invite to Game</span>
      </button>
      <Link href="/chat" className="m-2 rounded-md bg-gray-500 px-2 text-white">
        Block this user
      </Link>
      <br />
      <button
        type="button"
        onClick={closeModal}
        className="mx-8 rounded-md bg-gray-200 px-2 text-black"
      >
        close
      </button>
    </div>
  );
};

export default UserComponent;
