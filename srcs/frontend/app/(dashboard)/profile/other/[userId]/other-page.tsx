"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import ModalPopup from "../../../components/modal/modal-popup";
import { ProfileType, UserType } from "@/app/types";
import HeaderMenu from "../../../components/headermenu";
import RankingContainer from "../../../components/raking-container";
import MatchHistoryContainer from "../../match-history-container";
import { ProfileContext, SocketContext } from "../../../layout";
import { useRouter } from "next/navigation";
import MUserOps from "../../../components/modal/m-user-ops";

const ProfileOtherPage = ({ userId }: any) => {
  const profile = useContext<ProfileType>(ProfileContext);
  const socket: any = useContext(SocketContext);
  const router = useRouter();

  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>(`/api/users/avatar/${userId}`);
  const [status, setStatus] = useState<string>("offline");
  const [timer, setTimer] = useState<number>(0);

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
      makeAPIRequest<string>("get", `/status/${userId}`)
        .then((result) => {
          if (result.success) {
            setStatus(result.data);
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
            setIcon(`/api/users/avatar/${userId}`);
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
        <div className="absolute left-[492px] top-[350px] flex h-[45px] w-[600px] flex-row items-center justify-start gap-[25px] text-17xl">
          <img
            className="relative h-[45px] w-[45px] cursor-pointer rounded-full"
            alt=""
            src={icon}
            onClick={openMUserOps}
          />
          <div className="relative w-[175px] truncate tracking-[0.1em]">
            {user?.username}
          </div>
          <div className="relative w-[70px] overflow-visible tracking-[0.1em] text-darkgray-200">
            {status}
          </div>
        </div>
        <img
          className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer userId={Number(userId)} />
        <img
          className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer userId={Number(userId)} />
      </div>
      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps
            onClose={closeMUserOps}
            user={user}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}
    </>
  );
};

export default ProfileOtherPage;
