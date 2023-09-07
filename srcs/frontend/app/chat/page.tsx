"use client";

import { useContext, useEffect, useState } from "react";
import ChannelName from "./channel_name";
import SidebarCategory from "./sidebar_category";
import MessageComponent from "./message";
import { User } from "./user";

import UserComponent from "./user";
import makeAPIRequest from "@/app/api/api";
import type { ChannelType, MessageType } from "./types";
import { ProfileContext, SocketContext, ErrorContext } from "../layout";
import { ProfileType } from "../types";
import UserStatusCategory from "./user_status_category";

const ChatUI = () => {
  const Users: Array<User> = [
    {
      id: 1,
      nickname: "hoge-on",
      status: "online",
    },
    {
      id: 2,
      nickname: "fuga-on",
      status: "online",
    },
    {
      id: 3,
      nickname: "foo-off",
      status: "offline",
    },
  ];

  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null,
  );
  const [messages, setMessages] = useState<MessageType[]>([]);

  const profile: ProfileType = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);
  const error: any = useContext(ErrorContext);

  useEffect(() => {
    if (profile.userId != "") {
      // チャンネル一覧を取得
      makeAPIRequest<ChannelType[]>("get", "/chats")
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
    socket?.on("chat-message", (message: MessageType) => {
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
        socket?.emit("chat-leave", selectedChannel);
      }
      // イベントハンドラの解除
      socket?.off("chat-message");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // チャンネル選択時のハンドラ
  const handleChannelSelect = (channel: ChannelType) => {
    if (selectedChannel) {
      // 同じチャンネル名をクリックした場合は何もしない
      if (selectedChannel.channelId === channel.channelId) return;
      // すでに別のチャンネルに入室済みであれば退室する
      console.log("退室:", selectedChannel);
      socket?.emit("chat-leave", selectedChannel);
      // 表示しているログをクリア
      setMessages([]);
    }

    // 選択したチャンネルに入室
    setSelectedChannel(channel);
    console.log("入室:", channel);
    socket?.emit("chat-join", channel);
    // 過去のメッセージを要求
    socket?.emit("chat-getPastMessages", { channelId: channel.channelId });
  };

  return (
    <>
      <div className="flex">
        <aside
          id="separator-sidebar"
          className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
            <SidebarCategory categoryName="Channels" />
            <ul className="space-y-2 font-medium">
              {channels?.map((channel: ChannelType) => (
                <ChannelName
                  key={channel.channelId}
                  channel={channel}
                  onSelectChannel={handleChannelSelect}
                />
              ))}
            </ul>
            <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
              {/* <ChannelName channel={{ id: 1, name: "general" }} />
              <ChannelName channel={{ id: 2, name: "random" }} /> */}
            </ul>
          </div>
        </aside>
        <div className="container bg-gray-700">
          <div className="grow  flex-col-reverse divide-y divide-gray-500/30 px-4">
            {messages?.map((message: MessageType) => (
              <MessageComponent key={message.channelId} message={message} />
            ))}
          </div>
        </div>
        <aside
          id="separator-sidebar"
          className="left-0 top-0 z-40 h-screen w-64 shrink-0 translate-x-0 transition-transform "
          aria-label="Sidebar"
        >
          <div className="h-full shrink-0 overflow-y-auto bg-gray-800 px-3 py-4">
            <UserStatusCategory categoryName="online" />
            <ul className="space-y-2 font-medium">
              {Users.map((u) => (
                <UserComponent key={u.id} user={u} />
              ))}
            </ul>
            <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
              <UserStatusCategory categoryName="offline" />
              {Users.map((u) => (
                <UserComponent key={u.id} user={u} />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ChatUI;
