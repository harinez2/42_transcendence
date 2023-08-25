"use client";

import { useContext, useEffect, useState } from "react";
import { DmChannelType, DmMessageType } from "./types";
import MessageList from "./messages";
import UserListComponent from "./user_list";
import makeAPIRequest from "@/app/api/api";
import { ProfileContext, SocketContext, ErrorContext } from "../layout";

const DirectMessageUI = () => {
  const [channels, setChannels] = useState<DmChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<DmChannelType | null>(
    null,
  );
  const [messages, setMessages] = useState<DmMessageType[]>([]);

  const profile: any = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);
  const error: any = useContext(ErrorContext);

  useEffect(() => {
    if (profile.userId != "") {
      // チャンネル一覧を取得
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

  useEffect(() => {
    // socketのイベントハンドラを登録
    socket?.on("dm-message", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    // このコンポーネントがアンマウントされた時にクリーンアップ
    return () => {
      // 他の画面へ遷移したときは退室する
      if (selectedChannel) {
        console.log("退室:", selectedChannel);
        socket?.emit("dm-leave", selectedChannel);
      }
      // イベントハンドラの解除
      socket?.off("dm-message");
    };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // チャンネル選択時のハンドラ
  const handleChannelSelect = (channel: DmChannelType) => {
    if (selectedChannel) {
      // 同じチャンネル名をクリックした場合は何もしない
      if (selectedChannel.channelId === channel.channelId) return;
      // すでに別のチャンネルに入室済みであれば退室する
      console.log("退室:", selectedChannel);
      socket?.emit("dm-leave", selectedChannel);
      // 表示しているログをクリア
      setMessages([]);
    }

    // 選択したチャンネルに入室
    setSelectedChannel(channel);
    console.log("入室:", channel);
    socket?.emit("dm-join", channel);
    // 過去のメッセージを要求
    socket?.emit("dm-getPastMessages", { channelId: channel.channelId });
  };

  // メッセージ発言ハンドラ
  const handleSendMessage = (channel: DmChannelType, message: string) => {
    socket?.emit("dm-message", {
      channelId: channel.channelId,
      senderId: profile?.userId,
      content: message,
    });
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
      <MessageList
        channel={selectedChannel}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      {error != null && <p>{error}</p>}
    </div>
  );
};

export default DirectMessageUI;
