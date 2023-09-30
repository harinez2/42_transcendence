import Image from "next/image";
import { DmChannelType, DmMessageType } from "./types";
import Link from "next/link";
import ModalPopup from "../components/modal/modal-popup";
import MUserOps from "../components/modal/m-user-ops";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileType, UserType } from "@/app/types";
import { ProfileContext, SocketContext } from "../layout";
import makeAPIRequest from "@/app/api/api";

const MessageComponent = ({
  message,
  socket,
  profile,
  router,
}: {
  message: DmMessageType;
  socket: any;
  profile: ProfileType;
  router: any;
}) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const [user, setUser] = useState<UserType>();

  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  useEffect(() => {
    if (message) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${message.senderId}`)
        .then((result) => {
          if (result.success) {
            setUser(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [message]);

  return (
    <>
      <div className="mt-2 p-4">
        <div className="mb-2 flex flex-row items-end space-x-6">
          <Image
            src={`/api/users/avatar/${message.senderId}?stamp=${message.sender.updated}`}
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
            onClick={openMUserOps}
          />
          <div className="flex-initial shrink-0 text-2xl font-bold text-gray-300">
            {message.sender.username}
          </div>
          <div className="shrink-0 py-1 pr-8 text-sm text-gray-400">
            {message?.createdAt?.toLocaleString()}
          </div>
        </div>
        {message.content.indexOf("http://localhost:3000/game/preparing") >=
        0 ? (
          <>
            <p className="px-2 text-base text-gray-300">
              {message.content.replace(
                "http://localhost:3000/game/preparing",
                "",
              )}
              <Link
                href="/game/preparing"
                className="m-2 rounded-md bg-gray-500 px-2 text-white"
              >
                http://localhost:3000/game/preparing
              </Link>
            </p>
          </>
        ) : (
          <p className="px-2 text-base text-gray-300">{message.content}</p>
        )}
      </div>
      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps
            onClose={closeMUserOps}
            user={user}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}
    </>
  );
};

const MessageList = ({
  channel,
  messages,
  onSendMessage,
}: {
  channel: DmChannelType | null;
  messages: DmMessageType[];
  onSendMessage: (channel: DmChannelType, message: string) => void; // eslint-disable-line no-unused-vars
}) => {
  const handleSendMessage = (event: any) => {
    if (event.key === "Enter" && channel != null && event.target.value !== "") {
      onSendMessage(channel, event.target.value);
      event.target.value = "";
    }
  };

  const socket: any = useContext(SocketContext);
  const profile: ProfileType = useContext(ProfileContext);
  const router = useRouter();

  return (
    <div className="mx-72 shrink-0 grow bg-darkslategray-100">
      {/* sidebar の 64 + px-3 だけずらす */}
      <div className="fixed mr-72 h-[calc(100%-132px-36px)] w-full overflow-x-hidden overflow-y-scroll">
        {/* 
                    header の高さ 132px と input の高さ 36px 分だけずらす 
                    幅は 100% で、sidebar の数値分だけずらす(288px * 2)
                  */}
        <div className="w-[calc(100%-288px-74px)] flex-col-reverse divide-y divide-gray-500/30 hyphens-auto whitespace-normal break-all px-4">
          {messages?.map((message) => (
            <MessageComponent
              key={message.messageId}
              message={message}
              socket={socket}
              profile={profile}
              router={router}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 mx-4 mb-4 w-[calc(100%-288px-74px)]">
        <input
          type="text"
          className="h-[51px] w-full rounded-[5px] bg-zinc-600 px-[17.75px] text-xl font-normal tracking-widest text-zinc-500"
          placeholder="Send a message"
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageList;
