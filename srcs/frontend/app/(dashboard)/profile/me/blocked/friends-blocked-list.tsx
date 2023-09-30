"use client";

import React from "react";
import { useContext, useEffect } from "react";
import MUserOps from "../../../components/modal/m-user-ops";
import ModalPopup from "../../../components/modal/modal-popup";
import { useState, useCallback } from "react";
import { ProfileType, UserType } from "@/app/types";
import makeAPIRequest from "@/app/api/api";
import { useRouter } from "next/navigation";
import { ProfileContext, SocketContext } from "../../../layout";

const BlockedComponent = ({ blocked }: { blocked: UserType }) => {
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

  const [status, setStatus] = useState<string>("offline");
  const [icon, setIcon] = useState<string>(
    `http://localhost:3000/api/users/avatar/${blocked.id}`,
  );
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (blocked.id) {
      // statusを取得
      makeAPIRequest<string>("get", `/status/${blocked.id}`)
        .then((result) => {
          if (result.success) {
            setStatus(result.data);
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
            setIcon(`http://localhost:3000/api/users/avatar/${blocked.id}`);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [timer]);

  return (
    <>
      <div>
        <a className="flex items-center rounded-full p-4 text-white">
          <img
            src={icon}
            className="h-auto max-w-full cursor-pointer rounded-full"
            width={45}
            height={45}
            alt=""
            onClick={openMUserOps}
          />
          <div className="ml-3 shrink-0 pr-8 text-xl">
            {blocked?.username}
            <div className="tracking-[0.1em] text-darkgray-200">{status}</div>
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
            user={blocked}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}
    </>
  );
};

const BlockedList = () => {
  const profile: ProfileType = useContext(ProfileContext);
  const [blockeds, setBlockeds] = useState<UserType[]>([]);

  useEffect(() => {
    if (profile.userId != 0) {
      // Blockeds一覧を取得
      makeAPIRequest<UserType[]>(
        "get",
        `/friends/block/blockeds/${profile.userId}`,
      )
        .then((result) => {
          if (result.success) {
            setBlockeds(result.data);
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
          {blockeds?.map((blocked) => (
            <BlockedComponent key={blocked.id} blocked={blocked} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlockedList;
