"use client";

import ProfileOtherPage from "./profile-other-page";
import React, { useContext, useEffect } from "react";
import { SocketContext } from "@/app/layout";

export const dynamicParams = false;

// export async function generateStaticParams() {
//     const profiles : ProfileType[] = await getAllProfile();
//     return profiles.map((profile: ProfileType) => (
//         { userId: profile.id, } //need to change profile.id to profile.userId
//     ))
// }

const ProfileOther = ({ params }: any) => {
  const { userId } = params;
  const socket: any = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      // オンラインを申告
      console.log("sent status-switch_to_online: socketId=", socket?.id);
      socket?.emit("status-switch_to_online");
    }
  }, [socket]);

  return <ProfileOtherPage userId={userId} />;
};

export default ProfileOther;
