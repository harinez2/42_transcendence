"use client";

import { useContext, useEffect } from "react";
import MUserOps from "../../../components/modal/m-user-ops";
import ModalPopup from "../../../components/modal/modal-popup";
import { useState, useCallback } from "react";
import { ProfileType } from "@/app/types";
import makeAPIRequest from "@/app/api/api";
import { FolloweeType, StatusType, UserType } from "./types";
import { useRouter } from "next/navigation";
import { ProfileContext, SocketContext } from "@/app/layout";

const FriendComponent = ({ followee }: { followee: FolloweeType }) => {
  const router = useRouter();

  const profile: ProfileType = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);

  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  const [status_variable, setStatus] = useState<StatusType>();
  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>(
    "http://localhost:3000/api/users/avatar/0",
  );
  const [statusstr, setStatusStr] = useState<string>("offline");
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (followee.id) {
      // statusを取得
      makeAPIRequest<StatusType>("get", `/status/${followee.id}`)
        .then((result) => {
          if (result.success) {
            setStatus(result.data);
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [followee, timer]);

  useEffect(() => {
    if (status_variable) {
      // アイコン画像を取得
      makeAPIRequest<UserType>("get", `/users/${status_variable.userId}`)
        .then((result) => {
          if (result.success) {
            setUser(result.data);
            if (user?.avatar) {
              setIcon(`http://localhost:3000/api/users/avatar/${status_variable.userId}`);
            }
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, []);

  // const status1 = () => {
  //   if (status_variable && status_variable.status !== "") {
  //     return status_variable.status;
  //   } else {
  //     return "offline";
  //   }
  // };

  useEffect(() => {
    if (status_variable?.userId) {
      if (status_variable && status_variable.status !== "") {
        setStatusStr(status_variable.status);
      }
    }
  }, [timer]);

  return (
    <>
      <div>
        <a className="flex items-center rounded-lg p-4 text-white">
          <img
            src={icon}
            className="h-auto max-w-full cursor-pointer rounded-full"
            width={45}
            height={45}
            alt=""
            onClick={openMUserOps}
          />
          <div className="ml-3 shrink-0 pr-8 text-xl">
            {followee?.username}
            <div className="tracking-[0.1em] text-darkgray-200">
              {statusstr}
            </div>
          </div>
        </a>
      </div>
      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps
            onClose={closeMUserOps}
            user={followee}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}
    </>
  );
};

const FriendsList = () => {
  const profile: ProfileType = useContext(ProfileContext);
  const [followees, setFollowees] = useState<FolloweeType[]>([]);

  useEffect(() => {
    if (profile.userId != 0) {
      // followees一覧を取得
      makeAPIRequest<FolloweeType[]>(
        "get",
        `/friends/follow/followees/${profile.userId}`,
      )
        .then((result) => {
          if (result.success) {
            setFollowees(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  return (
    <>
      <div className="absolute left-[470px] top-[400px] text-left text-xl ">
        <ul className="border-b-8">
          {followees?.map((followee) => (
            <FriendComponent
              key={followee.id}
              followee={followee}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendsList;
