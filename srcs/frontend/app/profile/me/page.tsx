"use client";

import { SocketContext } from "@/app/layout";
import MePage from "./me-page";
import React, { useContext, useEffect } from "react";

const ProfileMine = () => {
  const socket: any = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      // オンラインを申告
      console.log("sent status-switch_to_online: socketId=", socket?.id);
      socket?.emit("status-switch_to_online");
    }
  }, [socket]);

  return <MePage />;
};

export default ProfileMine;
