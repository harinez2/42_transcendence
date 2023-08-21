import type { MessageType } from "./types";

const MessageComponent = ({ message }: { message: MessageType }) => {
  return (
    <>
      <div className="mt-2 p-4">
        <div className="mb-2 flex flex-row items-end space-x-6">
          <div className="flex-initial shrink-0 text-2xl font-bold text-gray-300">
            {message?.sender?.username}
          </div>
          <div className="shrink-0 py-1 pr-8 text-sm text-gray-400">
            {" "}
            {message?.createdAt?.toLocaleString()}
          </div>
        </div>
        <p className="px-2 text-base text-gray-300">{message?.content}</p>
      </div>
    </>
  );
};

export default MessageComponent;
