"use client";

import { useEffect, useRef, useState } from "react";
import { ProfileType, DmChannelType, DmMessageType } from "./types";
import MessageList from "./messages";
import UserListComponent from "./user_list";
import makeAPIRequest from "@/app/api/api";
import { io } from "socket.io-client";

const DirectMessageUI = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [channels, setChannels] = useState<DmChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<DmChannelType | null>(
    null,
  );
  const [messages, setMessages] = useState<DmMessageType[]>([]);
  const socketRef = useRef<any>();

  // 初回レンダリング直後に一度だけ実行される
  useEffect(() => {
    // 自身のプロファイルを取得
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

    // ソケットの作成
    // socketRef.current = io(API_PATH);
    socketRef.current = io("http://localhost:5000");
    // ソケットの接続時ハンドラ設定
    socketRef.current.on("connect", () => {
      console.log("connected: ", socketRef.current.id);
    });
    // messageハンドラの設定
    socketRef.current.on("message", (message: DmMessageType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // 例外ハンドラの設定
    socketRef.current.on("exception", (data: any) => {
      console.error("exception", data);
    });

    return () => {
      if (socketRef.current != null) {
        socketRef.current.disconnect();
        console.log("disconnected.");
      }
    };
  }, []);

  // ユーザプロファイル取得後にチャンネル一覧を取得
  useEffect(() => {
    if (profile) {
      makeAPIRequest<DmChannelType[]>("get", `/dms/${profile.userId}`)
        .then((result) => {
          if (result.success) {
            setChannels(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  // チャンネル選択時のハンドラ
  const handleChannelSelect = (channel: DmChannelType) => {
    if (selectedChannel) {
      // 同じチャンネル名をクリックした場合は何もしない
      if (selectedChannel.channelId === channel.channelId) return;
      // すでに別のチャンネルに入室済みであれば退室する
      console.log("退室:", selectedChannel);
      // 表示しているログをクリア
      setMessages([]);
    }

    // 選択したチャンネルに入室
    setSelectedChannel(channel);
    console.log("入室:", channel);
    // 過去のメッセージを要求
    socketRef.current.emit("getPastMessages", { channelId: channel.channelId });
  };

  return (
    <div className="flex">
      <aside
        id="separator-sidebar"
        className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform"
        aria-label="Sidebar"
      >
        {profile != null && (
          <UserListComponent
            profile={profile}
            channels={channels}
            onSelectChannel={handleChannelSelect}
          />
        )}
      </aside>
      <MessageList messages={messages} />
      {error != null && <p>{error}</p>}
    </div>
  );
};

export default DirectMessageUI;
