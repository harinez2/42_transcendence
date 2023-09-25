"use client";

import { useContext, useEffect, useState } from "react";
import ChannelName from "./channel_name";

import UserComponent, { User } from "./user";
import makeAPIRequest from "@/app/api/api";
import type { ChannelType, MessageType } from "./types";
import { ProfileContext, SocketContext, ErrorContext } from "../layout";
import { ProfileType } from "../types";
import ChannelCategory from "./channel_category";
import UserStatusCategory from "./user_status_category";
import HeaderMenu from "../components/headermenu";
import MessageList from "./messages";
import { useRouter } from "next/navigation";

enum OnlineStatus { // eslint-disable-line no-unused-vars
  OFFLINE = "offline", // eslint-disable-line no-unused-vars
  ONLINE = "online", // eslint-disable-line no-unused-vars
  GAMING = "gaming", // eslint-disable-line no-unused-vars
}

type StatusType = {
  userId: number;
  user: User;
  socketId: string;
  status: OnlineStatus;
};

const ChatUI = () => {
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null,
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<StatusType[]>([]);
  const [timer, setTimer] = useState<number>(0);

  // 1分おきにAPIをたたいてtimer変数を書き換える=useEffect()でオンライン状態を取得する
  setInterval(() => setTimer(timer + 1), 60 * 1000);

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
    if (profile && profile.userId && selectedChannel) {
      // 選択したチャンネルのステータス一覧を取得
      makeAPIRequest<StatusType[]>(
        "get",
        `/status/channel/${selectedChannel.channelId}`,
      )
        .then((result) => {
          if (result.success) {
            setStatus(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [selectedChannel, timer]);

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

  // チャンネルから退出するハンドラ
  // eslint-disable-next-line no-unused-vars
  const handleChannelLeave = (channel: ChannelType) => {
    if (selectedChannel) {
      console.log("退室:", selectedChannel);
      socket?.emit("chat-leave", selectedChannel);
      // 表示しているログをクリア
      setMessages([]);
    }
  };

  // メッセージ発言ハンドラ
  const handleSendMessage = (channel: ChannelType, message: string) => {
    socket?.emit("chat-message", {
      channelId: channel.channelId,
      senderId: profile?.userId,
      content: message,
    });
  };

  const removeChannel = (channelId: number) => {
    setChannels((prevChannels) => {
      const newChannels = prevChannels.filter((c) => c.channelId !== channelId);
      return newChannels;
    });
  };

  return (
    <>
      <div className="h-screen w-full bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
        {/* // 3つのdivを横に並べる */}
        <div className="relative top-[100px] flex h-[calc(100%_-_132px)] w-full flex-row">
          {/* header の高さ 132px 分だけずらす */}
          <div className="fixed h-[calc(100%_-_132px)] w-64 shrink-0 bg-darkslategray-200 px-3 py-4">
            <div className="fixed h-[calc(100%_-_132px-64px)] w-64 shrink-0 overflow-y-scroll bg-darkslategray-200">
              {/* divの幅は64 */}
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
                    userId={profile?.userId}
                    setChannel={updateChannel}
                    onSelectChannel={handleChannelSelect}
                    removeChannel={removeChannel}
                    handleChannelLeave={handleChannelLeave}
                  />
                ))}
              </ul>
              <button
                className="fixed bottom-5 ml-6 h-[38px] w-[160px] cursor-pointer items-center justify-center  rounded-[5px] bg-neutral-400"
                onClick={() => {
                  router.push("/chat/channel-list");
                }}
              >
                <div className="text-center text-xl font-normal tracking-widest text-white">
                  Join channel
                </div>
              </button>
            </div>
          </div>
          <MessageList
            channel={selectedChannel}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          {error != null && <p>{error}</p>}
          <div className="z-50 h-full w-48 flex-none bg-darkslategray-200 px-3 py-4">
            <UserStatusCategory categoryName="gaming" />
            <ul className="space-y-2 font-medium">
              {selectedChannel?.users.user.map(
                (userId) =>
                  status.some(
                    (data) =>
                      data.userId === userId &&
                      data.status === OnlineStatus.GAMING,
                  ) && (
                    <UserComponent
                      key={userId}
                      user={status.find((e) => e.userId === userId)?.user}
                      router={router}
                      socket={socket}
                      profile={profile}
                      channel={selectedChannel}
                    />
                  ),
              )}
            </ul>
            <UserStatusCategory categoryName="online" />
            <ul className="space-y-2 font-medium">
              {selectedChannel?.users.user.map(
                (userId) =>
                  status.some(
                    (data) =>
                      data.userId === userId &&
                      data.status === OnlineStatus.ONLINE,
                  ) && (
                    <UserComponent
                      key={userId}
                      user={status.find((e) => e.userId === userId)?.user}
                      router={router}
                      socket={socket}
                      profile={profile}
                      channel={selectedChannel}
                    />
                  ),
              )}
            </ul>
            <UserStatusCategory categoryName="offline" />
            <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
              {selectedChannel?.users.user.map(
                (userId) =>
                  status.some(
                    (data) =>
                      data.userId === userId &&
                      data.status === OnlineStatus.OFFLINE,
                  ) && (
                    <UserComponent
                      key={userId}
                      user={status.find((e) => e.userId === userId)?.user}
                      router={router}
                      socket={socket}
                      profile={profile}
                      channel={selectedChannel}
                    />
                  ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
