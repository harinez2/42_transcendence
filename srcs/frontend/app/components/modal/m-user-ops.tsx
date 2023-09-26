import React, { useState } from "react";
import type { NextPage } from "next";
import { UserType } from "@/app/types";
import makeAPIRequest from "@/app/api/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Socket } from "socket.io-client";
import { ProfileType } from "@/app/types";

type MUserOpsType = {
  onClose: () => void;
  user: UserType | undefined; // TODO: checkお願いします！ by tsudo
  router: AppRouterInstance;
  socket: Socket;
  profile: ProfileType;
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

// eslint-disable-next-line no-unused-vars
// const MUserOps: NextPage<MUserOpsType> = ({ onClose }) => {
// NOTE: User をクリックしたときに表示される dialog
const MUserOps: NextPage<MUserOpsType> = ({
  onClose,
  user,
  router,
  socket,
  profile,
}) => {
  const [error, setError] = useState<string>("");

  if (!user) {
    return <></>; // TODO: checkお願いします！ by tsudo
  }

  const onClickAddFriend = (userId: number) => {
    makeAPIRequest<UserType>("post", `/friends/follow`, {
      followeeId: userId,
    })
      .then((result) => {
        if (result.success) {
          setError("");
          // modal を閉じる
          onClose();
        } else {
          setError(result.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onClickBlock = (userId: number) => {
    // POST /friends/block
    makeAPIRequest<UserType>("post", `/friends/block`, {
      blockedId: userId,
    })
      .then((result) => {
        if (result.success) {
          setError("");
          onClose();
        } else {
          console.log(result.error);
          setError(result.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // map に直す

  const handles = [
    {
      name: "See Profile",
      onClick: () => router.push(`/profile/other/${user.id}`),
    },
    {
      name: "Send DM",
      onClick: () => router.push(`/dm`),
    },
    {
      name: "Add Friend",
      onClick: () => onClickAddFriend(user.id),
    },
    {
      name: "Invite to Game",
      onClick: () => onClickInviteToGame(user.id, router, socket, profile),
    },
    {
      name: "Block this user",
      onClick: () => onClickBlock(user.id),
    },
  ];
  return (
    // NOTE: dialog の中身
    <div className="flex w-40 flex-col rounded-lg bg-darkslategray-100 px-6 py-2 text-white">
      User ops
      {/* map に直す} */}
      {handles.map((handle) => {
        return (
          <button
            onClick={handle.onClick}
            key={handle.name}
            className="m-2 cursor-pointer rounded-md bg-gray-500 px-2 text-white"
          >
            <span className="x1 text-left">{handle.name}</span>
          </button>
        );
      })}
      <br />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="button"
        onClick={onClose}
        className="mx-8 rounded-md bg-gray-200 px-2 text-black"
      >
        close
      </button>
    </div>
  );
};

export default MUserOps;
