"use client";

import { useContext, useEffect } from "react";
import MUserOps from "../../../components/modal/m-user-ops";
import ModalPopup from "../../../components/modal/modal-popup";
import { useState, useCallback } from "react";
import { ProfileType } from "@/app/types";
import { ProfileContext } from "@/app/layout";
import makeAPIRequest from "@/app/api/api";
import { FolloweeType, StatusType } from "./types";

const FriendComponent = ({ followee }: {
  // profile: ProfileType;
  followee: FolloweeType;
}
  ) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  const [status_variable, setStatus] = useState<StatusType>();

  const [profile, setProfile] = useState<ProfileType>();

   useEffect(() => {
    if (followee.id) {
      // statusを取得
      makeAPIRequest<StatusType>("get", `/status/${followee.id}`)
        .then((result) => {
          if (result.success) {
            setStatus(result.data);;
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
   }, [followee]); 
   
  useEffect(() => {
    if (status_variable) {
      // アイコン画像を取得
      makeAPIRequest<ProfileType>("get", `/profiles/${status_variable.userId}`)
        .then((result) => {
          if (result.success) {
            setProfile(result.data);;
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [status_variable]); 

  //ダミーユーザーはstatusが反映されていなので、初期設定をofflineにする
  const status1 = () => {
    if (status_variable && status_variable.status !== "") {
      return status_variable.status;
    } else {
      return "offline";
    }
  }
  
  const icon = () => {
    if (profile && profile.bio !== "") {
      return profile.bio;
    } else {
      return "http://localhost:3000/favicon.ico";
    }
  }

  return (
    <>
      <div>
        <a
          className="flex items-center rounded-lg p-4 text-white"
        >
          <img
            src={icon()}
            className="h-auto max-w-full rounded-full cursor-pointer"
            width={45}
            height={45}
            alt=""
            onClick={openMUserOps}
          /> 
          <div className="ml-3 flex-shrink-0 pr-8 text-xl">
            {followee?.username}
              <div className="tracking-[0.1em] text-darkgray-200">
              {status1()}
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
          <MUserOps onClose={closeMUserOps} />
        </ModalPopup>
      )}
    </>
  );
};

const FriendsList = () => {
  const profile: ProfileType = useContext(ProfileContext);
  const [followees, setFollowees] = useState<FolloweeType[]>([]);

  useEffect(() => {
    if (profile.userId != "") {
      // followees一覧を取得
      makeAPIRequest<FolloweeType[]>("get", `/friends/follow/followees/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            setFollowees(result.data);;
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
      <div
        className="absolute left-[470px] top-[400px] text-left text-xl "
      >
      <ul className="border-b-8">
        {followees?.map((followee) => (
          <FriendComponent
            key={followee.id}
            // profile={profile}
            followee={followee}
          />
        ))}
        </ul>
        </div>
    </>
  );
};

export default FriendsList;


