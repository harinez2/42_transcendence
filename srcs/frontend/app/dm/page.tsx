import MessageList, { Message } from "./messages";
import UserListComponent from "./user_list";
import { User } from "./user_list";

const DirectMessageUI = () => {
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
      nickname: "user1",
      status: "online",
    },
    {
      id: 2,
      nickname: "user2",
      status: "online",
    },
    {
      id: 3,
      nickname: "user3",
      status: "offline",
    },
  ];
  return (
    <div className="flex">
      <aside
        id="separator-sidebar"
        className="left-0 top-0 z-40 h-screen w-64 translate-x-0 transition-transform"
        aria-label="Sidebar"
      >
        <UserListComponent users={Users} />
      </aside>
      <MessageList messages={Messages} />
    </div>
  );
};

export default DirectMessageUI;
