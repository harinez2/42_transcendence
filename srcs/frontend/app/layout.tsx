"use client";

import "../styles/globals.css";
import React, { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import makeAPIRequest from "./api/api";
import { ProfileType } from "./types";

export let ProfileContext: any = createContext(undefined);
export let SocketContext: any = createContext(undefined);
export let ErrorContext: any = createContext(undefined);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileType>({ userId: 0, bio: "" });
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

  // 自身のプロファイルを取得
  useEffect(() => {
    makeAPIRequest<ProfileType>("get", "/profiles")
      .then((result) => {
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occurred.");
      });
  }, []);

  // ソケット接続(認証後)
  useEffect(() => {
    if (profile && profile.userId) {
      const socket = io("http://localhost:5000");

      socket.on("connect", () => {
        console.log("connected:", socket.id);
        // オンラインを申告
        console.log("sent status-add_to_online: userId=", profile.userId);
        socket.emit("status-add_to_online", profile.userId);
      });

      socket.on("info", (data: any) => {
        console.log("info:", data);
      });

      socket.on("exception", (data: any) => {
        console.error("exception:", data);
      });

      setSocket(socket);
    }
  }, [profile]);

  // エラー時
  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="m-0">
        <ProfileContext.Provider value={profile}>
          <SocketContext.Provider value={socket}>
            <ErrorContext.Provider value={error}>
              {children}
            </ErrorContext.Provider>
          </SocketContext.Provider>
        </ProfileContext.Provider>
      </body>
    </html>
  );
};

export default RootLayout;
