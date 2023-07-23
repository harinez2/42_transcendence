import ChannelName from "./channel_name";
import ChannelCategory from "./channel_category";
import MessageComponent from "./message";
import { Message } from "./message";

const ChatUI = () => {
  const username = "user 1";

  const Messages: Array<Message> = [
    {
      id: 1,
      comment: "hoge",
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      comment: "fuga",
      createdAt: "2022-12-12",
    },
  ];

  return (
    <>
      <div className="flex">
        <aside
          id="separator-sidebar"
          className="left-0 top-0 z-40 h-screen w-64 shrink-0 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
            <ChannelCategory categoryName="Channels" />
            <ul className="space-y-2 font-medium">
              <ChannelName channel={{ id: 1, name: "general" }} />
              <ChannelName channel={{ id: 2, name: "random" }} />
            </ul>
            <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
              <ChannelName channel={{ id: 1, name: "general" }} />
              <ChannelName channel={{ id: 2, name: "random" }} />
            </ul>
          </div>
        </aside>
        <div className="container bg-gray-700">
          <div className="grow flex-col-reverse divide-y divide-gray-500/30 px-4">
            {Messages.map((message) => (
              <MessageComponent
                key={message.id}
                message={message}
                username={username}
              />
            ))}
            {/* <MessageComponent comment={"hoge"} />
          <MessageComponent comment={"fuga"} />
          <MessageComponent comment={"ff"} />
          <MessageComponent comment={"ttt"} />
          <MessageComponent comment={"xxx"} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
