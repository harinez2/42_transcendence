"use client";

import ProfileOtherPage from "./other-page";
import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../../layout";

export const dynamicParams = false;

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
