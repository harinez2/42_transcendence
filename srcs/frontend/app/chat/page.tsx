import ChannelName from "./channel_name";
import SidebarCategory from "./sidebar_category";
import MessageComponent from "./message";
import { Message } from "./message";
import { User } from "./user";
import UserComponent from "./user";

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

  return (
    <>
      <div className="flex">
        <aside
          id="separator-sidebar"
          className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
            <SidebarCategory categoryName="Channels" />
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
          <div className="grow  flex-col-reverse divide-y divide-gray-500/30 px-4">
            {Messages.map((message) => (
              <MessageComponent
                key={message.id}
                message={message}
                username={username}
              />
            ))}
          </div>
        </div>
        <aside
          id="separator-sidebar"
          className="left-0 top-0 z-40 h-screen w-64 shrink-0 translate-x-0 transition-transform "
          aria-label="Sidebar"
        >
          <div className="h-full shrink-0 overflow-y-auto bg-gray-800 px-3 py-4">
            <SidebarCategory categoryName="online" />
            <ul className="space-y-2 font-medium">
              {Users.map((u) => (
                <UserComponent key={u.id} user={u} />
              ))}
            </ul>
            <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
              <SidebarCategory categoryName="offline" />
              {Users.map((u) => (
                <UserComponent key={u.id} user={u} />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ChatUI;
