"use client";

import { useCallback, useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import ModalPopup from "@/app/components/modal/modal-popup";
import MUserOps from "@/app/components/modal/m-user-ops";
import { UserType } from "@/app/components/types";
import HeaderMenu from "@/app/components/headermenu";
import RankingContainer from "@/app/components/raking-container";
import MatchHistoryContainer from "@/app/components/match-history-container";
import { StatusType } from "../../me/blocked/types";

const ProfileOtherPage = ({ userId }: any) => {
  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>(
    "http://localhost:3000/api/users/avatar/0",
  );
  const [status, setStatus] = useState<StatusType>();
  const [statusstr, setStatusStr] = useState<string>("offline");

  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  useEffect(() => {
    if (userId) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${userId}`)
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      // statusを取得
      makeAPIRequest<StatusType>("get", `/status/${userId}`)
        .then((result) => {
          if (result.success) {
            setStatus(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (userId) {
      if (status && status.status !== "") {
        setStatusStr(status.status);
      }
    }
  }, [status]);

  if (user?.avatar) {
    setIcon(`http://localhost:3000/api/users/avatar/${userId}`);
  }

  return (
    <>
      <div className="relative h-screen w-full overflow-y-auto bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        <div className="absolute left-[500px] top-[220px] tracking-[0.1em]">
          Profile
        </div>
        <img
          className="absolute left-[470px] top-[262.5px] h-[5px] w-[500px]"
          alt=""
          src="/line-1.svg"
        />
        <div className="absolute left-[492px] top-[350px] flex h-[45px] w-[439px] flex-row items-center justify-start  gap-[25px] text-17xl">
          <img
            className="relative h-[45px] w-[45px] cursor-pointer rounded-full rounded-full"
            alt=""
            src={icon}
            onClick={openMUserOps}
          />
          <div className="relative w-[175px] truncate tracking-[0.1em]">
            {user?.username}
          </div>
          <div className="relative w-[70px] text-5xl">{statusstr}</div>
        </div>
        <img
          className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer userId={userId} />
        <img
          className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer userId={userId} />
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

export default ProfileOtherPage;
