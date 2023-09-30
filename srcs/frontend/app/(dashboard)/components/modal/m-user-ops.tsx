import React, { useEffect, useState } from "react";
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

  // ユーザが、自分自身の場合、button を disable にする
  const [isSelf, setIsSelf] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsSelf(user.id === profile.userId);
    }
  }, [user]);

  useEffect(() => {
    if (profile.userId) {
      // Blockeds一覧を取得
      makeAPIRequest<UserType[]>(
        "get",
        `/friends/block/blockeds/${profile.userId}`,
      )
        .then((result) => {
          if (result.success) {
            result.data.some((blocked) => user && blocked.id === user.id)
              ? setBlocked(true)
              : setBlocked(false);
          } else {
            setError(result.error);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [profile]);

  if (!user) {
    return <></>; // TODO: checkお願いします！ by tsudo
  }

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
    // DBにゲーム情報を書きこむのにちょっと時間かかるので1秒待つ
    setTimeout(() => router.push("/game/preparing"), 1000);
  };

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
    // makeAPIRequest<UserType>("post", `/friends/block`, {
    //   blockedId: userId,
    // })
    //   .then((result) => {
    //     if (result.success) {
    //       setError("");
    //       onClose();
    //     } else {
    //       setError(result.error);
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
    if (profile.userId) {
      socket?.once('block-user-response', (data: any) => {
        setError(data.err);
        if (data.err === "") {
          onClose();
        }
      });
      socket?.emit('block-user', {
        blockerId: profile.userId,
        blockedId: userId,
      });
    }
  };

  const onClickUnblock = (userId: number) => {
    // DELETE /friends/block
    makeAPIRequest<UserType>("post", `/friends/block/unblock`, {
      blockedId: userId,
    })
      .then((result) => {
        if (result.success) {
          setError("");
          onClose();
        } else {
          setError(result.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handles = [
    {
      name: "See Profile",
      onClick: () => router.push(`/profile/other/${user.id}`),
      selfAvailable: true,
      ok: true,
    },
    {
      name: "Send DM",
      onClick: () => router.push(`/dm`),
      selfAvailable: false,
      ok: !isSelf && !blocked,
    },
    {
      name: "Add Friend",
      onClick: () => onClickAddFriend(user.id),
      selfAvailable: false,
      ok: !isSelf && !blocked,
    },
    {
      name: "Invite to Game",
      onClick: () => onClickInviteToGame(user.id, router, socket, profile),
      selfAvailable: false,
      ok: !isSelf && !blocked,
    },
    {
      name: "Block this user",
      onClick: () => onClickBlock(user.id),
      selfAvailable: false,
      blocked: false,
      ok: !isSelf && !blocked,
    },
    {
      name: "unBlock this user",
      onClick: () => onClickUnblock(user.id),
      ok: !isSelf && blocked,
    },
  ];

  const buttonStyle =
    "m-2 cursor-pointer rounded-md bg-gray-500 px-2 text-white hover:bg-gray-600 ";
  const buttonStyleDisabled =
    "m-2 rounded-md bg-gray-500 px-2 text-white  disabled:opacity-50";
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
            className={
              // 自分自身の場合、button を disable にする
              !handle.ok ? buttonStyleDisabled : buttonStyle
            }
            disabled={!handle.ok}
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
        className="mx-8 cursor-pointer rounded-md bg-gray-200 px-2 text-black hover:bg-gray-300"
      >
        close
      </button>
    </div>
  );
};

export default MUserOps;
