import Image from "next/image";
import { DmMessageType } from "./types";

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
        <p className="px-2 text-base text-gray-300">{message.content}</p>
      </div>
    </>
  );
};

const MessageList = ({ messages }: { messages: DmMessageType[] }) => {
  return (
    <div className="container bg-gray-700">
      <div className="grow  flex-col-reverse divide-y divide-gray-500/30 px-4">
        {messages?.map((message) => (
          <MessageComponent
            key={message.channelId}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
