"use client";

import { useContext, useEffect, useState } from "react";
import ChannelName from "./channel_name";
import MessageComponent from "./message";
import { User } from "./user";

import UserComponent from "./user";
import makeAPIRequest from "@/app/api/api";
import type { ChannelType, MessageType } from "./types";
import { ProfileContext, SocketContext, ErrorContext } from "../layout";
import { ProfileType } from "../types";
import ChannelCategory from "./channel_category";
import UserStatusCategory from "./user_status_category";
import HeaderMenu from "../components/headermenu";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const updateChannel = (channel: ChannelType) => {
    setChannels((prevChannels) => {
      const newChannels = prevChannels.map((c) => {
        if (c.channelId === channel.channelId) {
          return channel;
        }
        return c;
      });
      return newChannels;
    });
  };

  useEffect(() => {
    if (profile && profile.userId) {
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
    if (socket) {
      // オンラインを申告
      console.log("sent status-switch_to_online: socketId=", socket?.id);
      socket?.emit("status-switch_to_online");

      // socketのイベントハンドラを登録
      socket?.on("chat-message", (message: MessageType) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
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

  const removeChannel = (channelId: number) => {
    setChannels((prevChannels) => {
      const newChannels = prevChannels.filter((c) => c.channelId !== channelId);
      return newChannels;
    });
  };

  return (
    <>
      <div className="relative h-screen w-full bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        {/* <aside
          id="separator-sidebar"
          // className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform"
          aria-label="Sidebar"
        > */}
        <div className="absolute left-[0px] top-[100px] h-[calc(100%_-_131px)] w-64 shrink-0 bg-darkslategray-200 px-3 py-4 ">
          <ChannelCategory
            categoryName="Channels"
            channels={channels}
            setChannels={setChannels}
          />
          <ul className="space-y-2 font-medium">
            {channels?.map((channel: ChannelType) => (
              <ChannelName
                key={channel.channelId}
                channel={channel}
                setChannel={updateChannel}
                onSelectChannel={handleChannelSelect}
                removeChannel={removeChannel}
              />
            ))}
          </ul>
        </div>
        {/* </aside> */}
        <div className="container bg-darkslategray-100">
          <div className="grow flex-col-reverse divide-y divide-gray-500/30 px-4">
            {messages?.map((message: MessageType) => (
              <MessageComponent key={message.channelId} message={message} />
            ))}
          </div>
        </div>
        {/* <aside
          id="separator-sidebar"
          // className="w-64 shrink-0 translate-x-0 transition-transform "
          aria-label="Sidebar"
        > */}
        <div className="absolute right-[0px] top-[100px] h-[calc(100%_-_131px)] w-64 shrink-0 bg-darkslategray-200 px-3 py-4">
          <UserStatusCategory categoryName="online" />
          <ul className="space-y-2 font-medium">
            {Users.map((u) => (
              <UserComponent
                key={u.id}
                user={u}
                router={router}
                socket={socket}
                profile={profile}
                channel={selectedChannel}
              />
            ))}
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
            <UserStatusCategory categoryName="offline" />
            {Users.map((u) => (
              <UserComponent
                key={u.id}
                user={u}
                router={router}
                socket={socket}
                profile={profile}
                channel={selectedChannel}
              />
            ))}
          </ul>
        </div>
        {/* </aside> */}
      </div>
    </>
  );
};

export default ChatUI;
