export interface MessageProps {
  key: number;
  message: Message;
  username: string;
}

export type Message = {
  id: number;
  comment: string;
  createdAt: string;
};

const MessageComponent = ({ message, username }: MessageProps) => {
  return (
    <>
      <div className="mt-2 p-4">
        <div className="mb-2 flex flex-row items-end space-x-6">
          <div className="flex-initial text-2xl font-bold text-gray-300">
            {username}
          </div>
          <div className="py-1 text-sm text-gray-400"> {message.createdAt}</div>
        </div>
        <p className="px-2 text-base text-gray-300">{message.comment}</p>
      </div>
    </>
  );
};

export default MessageComponent;
