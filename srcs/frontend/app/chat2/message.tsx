interface MessageProps {
  comment: string;
}

const Message = ({ comment }: MessageProps) => {
  return <div className="bg-gray-500">{comment}</div>;
};

export default Message;
