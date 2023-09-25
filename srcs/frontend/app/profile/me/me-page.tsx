"use client";

import HeaderMenu from "../../components/headermenu";
import RankingContainer from "../../components/raking-container";
import MatchHistoryContainer from "../../components/match-history-container";
import { ProfileType } from "@/app/types";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { UserType } from "./blocked/types";

const MePage = () => {
  const profile: ProfileType = useContext(ProfileContext);
  const [user, setUser] = useState<UserType>();
  const [icon, setIcon] = useState<string>("http://localhost:3000/api/users/avatar/0");
  const [twofactorauth, setTwofactorauth] = useState<string>("off");
  
  console.log("profile.userId", profile.userId);
    useEffect(() => {
    if (profile?.userId) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${profile.userId}`)
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
    }, []);
  
  if (user) {
    if (user.twoFactorAuthEnabled === true) {
      setTwofactorauth("on");
    }
    if (user.avatar) {
      setIcon(`http://localhost:3000/api/users/avatar/${profile.userId}`);
    }
  } 

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
            <div className="relative tracking-[0.1em] w-[175px] truncate">{user?.username}</div>
          </div>
          <img
            className="relative h-[35px] w-[35px] cursor-pointer"
            alt=""
            src="/settings-icon.svg"
            // onClick={openMSettingsMinePopup}
          />
        </div>
        <div className="absolute left-[492px] top-[401px] flex h-7 w-[354px] flex-row items-center justify-start text-5xl">
          <div className="relative tracking-[0.1em]">
            two-factor authentication
          </div>
        </div>
        <div className="absolute left-[891.5px] top-[401px] h-7 w-[60px] text-5xl">
          <div className="absolute left-[0px] top-[3px] h-[25px] w-[60px] rounded-8xs bg-gray-500" />
          <div className="absolute left-[15px] top-[0px] tracking-[0.1em]">
            {twofactorauth}
          </div>
        </div>
        <img
          className="absolute left-[470px] top-[473px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <RankingContainer userId="1" />
        <img
          className="absolute left-[470px] top-[768px] h-0.5 w-[500px]"
          alt=""
          src="/line-2.svg"
        />
        <MatchHistoryContainer userId="1" />
      </div>
    </>
  );
};

export default MePage;
