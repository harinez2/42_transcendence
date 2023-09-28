"use client";

import HeaderMenu from "../../components/headermenu";
import RankingContainer from "../../components/raking-container";
import MatchHistoryContainer from "../match-history-container";
import { ProfileType } from "@/app/types";
import { useCallback, useContext, useEffect, useState } from "react";
import { ProfileContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { UserType } from "./blocked/types";
import { useRouter } from "next/navigation";

const MePage = () => {
  const router = useRouter();

  const profile = useContext<ProfileType>(ProfileContext);
  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>(`http://localhost:3000/api/users/avatar/${profile.userId}`);
  const [timer, setTimer] = useState<number>(0);

  const onSettingClick = useCallback(() => {
    router.push("/profile/me/settings");
  }, [router]);

  console.log("me-page profile.userId1", profile.userId);
  useEffect(() => {
    if (profile?.userId) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            console.log("me-page useEffect");
            setUser(result.data);
            setIcon(`http://localhost:3000/api/users/avatar/${profile.userId}`);
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile, timer]);

  // console.log("profile.userId2", profile.userId);
  // console.log(user);
  console.log("timer", timer);

  return (
    <>
      <div className="relative h-screen w-full overflow-y-auto bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        <div className="absolute left-[481px] top-[200px] tracking-[0.1em]">
          Your Profile
        </div>
        <img
          className="absolute left-[470px] top-[242.5px] h-[5px] w-[500px]"
          alt=""
          src="/line-1.svg"
        />

        <div className="absolute left-[492px] top-[283px] flex h-[45px] w-[439px] flex-row items-center justify-start gap-[100px] overflow-hidden text-17xl">
          <div className="flex h-[45px] w-[250px] shrink-0 flex-row items-center justify-start gap-[25px]">
            <img
              className="relative h-[45px] w-[45px] rounded-full"
              alt=""
              src={icon}
            />
            <div className="relative w-[175px] truncate tracking-[0.1em]">
              {user?.username}
            </div>
          </div>
          <img
            className="relative h-[35px] w-[35px] cursor-pointer"
            alt=""
            src="/settings-icon.svg"
            onClick={onSettingClick}
          />
        </div>
        <img
          className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer userId={profile.userId} />
        <img
          className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer userId={profile.userId} />
      </div>
    </>
  );
};

export default MePage;
