"use client";

import { useContext, useEffect, useState } from "react";
import ChannelName from "./channel_name";

import UserComponent from "./user";
import makeAPIRequest from "@/app/api/api";
import type { ChannelType, MessageType } from "./types";
import { ProfileContext, SocketContext, ErrorContext } from "../layout";
import { UserType, ProfileType } from "@/app/types";
import ChannelCategory from "./channel_category";
import UserStatusCategory from "./user_status_category";
import HeaderMenu from "../components/headermenu";
import MessageList from "./messages";
import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";

enum OnlineStatus { // eslint-disable-line no-unused-vars
  OFFLINE = "offline", // eslint-disable-line no-unused-vars
  ONLINE = "online", // eslint-disable-line no-unused-vars
  GAMING = "gaming", // eslint-disable-line no-unused-vars
}

type StatusType = {
  userId: number;
  user: UserType; // | undefined; // 確認して下さい! by tsudo
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
  const [blockedUserids, setBlockedUserids] = useState<number[]>([]);

  const profile: ProfileType = useContext(ProfileContext);
  const socket = useContext<Socket>(SocketContext);
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

  function fetchStatus() {
    if (profile && profile.userId && selectedChannel) {
      makeAPIRequest<StatusType[]>(
        "get",
        `/status/channel/${selectedChannel.channelId}`,
      )
        .then((result) => {
          if (result.success) {
            console.log("loaded status data: ", result.data);
            for (const res of result.data) {
              console.log(res);
            }
            setStatus(result.data);
            // 1分後に再度APIをたたいてオンライン状態を取得する
            setTimeout(() => setTimer(timer + 1), 60 * 1000);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }

  useEffect(() => {
    fetchStatus();
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
      socket?.off("userUpdated");
      socket?.on("userUpdated", () => {
        console.log("received userUpdated");
        fetchStatus();
      });
      socket?.off("chat-message");
      socket?.on("chat-message", (message: MessageType) => {
        if (blockedUserids.includes(message.senderId)) return;
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket, blockedUserids]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    socket?.emit("chat-reset");
    makeAPIRequest<UserType[]>("get", "/friends/block/blockeds")
      .then((result) => {
        if (result.success) {
          const blockedIds = result.data.map((user) => {
            return user.id;
          });
          setBlockedUserids(blockedIds);
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    // このコンポーネントがアンマウントされた時にクリーンアップ
    return () => {
      // 他の画面へ遷移したときは退室する
      if (selectedChannel) {
        console.log("退室:", selectedChannel);
        socket?.emit("chat-leave", selectedChannel);
      }
      console.log("退室(all)");
      socket?.emit("chat-reset");
      // イベントハンドラの解除
      socket?.off("chat-message");
      socket?.off("userUpdated");
      setMessages([]);
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
    socket?.emit("chat-getPastMessages", {
      channelId: channel.channelId,
      requestUserId: profile?.userId,
    });
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

  if (profile === null || profile === undefined) {
    return (
      <div className="h-screen w-full bg-darkslategray-100 text-left font-body text-xl text-base-white">
        <HeaderMenu />
      </div>
    );
  }

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
            {selectedChannel && (
              <>
                <div>{selectedChannel.channelName}</div>
                <UserStatusCategory categoryName="gaming" />
                <ul className="space-y-2 font-medium">
                  {status.map((s) =>
                    s.status == OnlineStatus.GAMING ? (
                      <UserComponent
                        key={`${s.userId}_${s.status}`}
                        user={s.user}
                        router={router}
                        socket={socket}
                        profile={profile}
                        channel={selectedChannel}
                      />
                    ) : (
                      <></>
                    ),
                  )}
                </ul>
                <UserStatusCategory categoryName="online" />
                <ul className="space-y-2 font-medium">
                  {status.map((s) =>
                    s.status == OnlineStatus.ONLINE ? (
                      <UserComponent
                        key={`${s.userId}_${s.status}`}
                        user={s.user}
                        router={router}
                        socket={socket}
                        profile={profile}
                        channel={selectedChannel}
                      />
                    ) : (
                      <></>
                    ),
                  )}
                </ul>
                <UserStatusCategory categoryName="offline" />
                <ul className="space-y-2 font-medium">
                  {status.map((s) =>
                    s.status == OnlineStatus.OFFLINE ? (
                      <UserComponent
                        key={`${s.userId}_${s.status}`}
                        user={s.user}
                        router={router}
                        socket={socket}
                        profile={profile}
                        channel={selectedChannel}
                      />
                    ) : (
                      <></>
                    ),
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
