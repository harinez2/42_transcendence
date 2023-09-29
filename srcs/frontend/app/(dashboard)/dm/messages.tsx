import Image from "next/image";
import { DmChannelType, DmMessageType } from "./types";
import Link from "next/link";

const MessageComponent = ({ message }: { message: DmMessageType }) => {
  return (
    <>
      <div className="mt-2 p-4">
        <div className="mb-2 flex flex-row items-end space-x-6">
          <Image
            src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
          />
          <div className="flex-initial shrink-0 text-2xl font-bold text-gray-300">
            {message.sender.username}
          </div>
          <div className="shrink-0 py-1 pr-8 text-sm text-gray-400">
            {" "}
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
    if (event.key === "Enter" && channel != null) {
      onSendMessage(channel, event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="container relative left-[310px] w-full bg-darkslategray-100">
      <div className="grow flex-col-reverse divide-y divide-gray-500/30 px-4">
        {messages?.map((message) => (
          <MessageComponent key={message.messageId} message={message} />
        ))}
      </div>
      <div className="fixed bottom-0 mx-4 mb-4 w-full">
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
