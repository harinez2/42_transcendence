import Image from "next/image";
export type User = {
  id: number;
  nickname: string;
  status: string;
};
export interface UserProps {
  key: number;
  user: User;
}

const UserComponent = ({ user }: UserProps) => {
  return (
    <>
      <li>
        <a
          href="#"
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        >
          <Image
            src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
          />
          <span className="ml-3 shrink-0 pr-8">{user.nickname}</span>
        </a>
      </li>
    </>
  );
};

const UserListComponent = ({ users }: { users: Array<User> }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
      <ul className="divide-y divide-gray-500/30">
        {users.map((u) => (
          <UserComponent key={u.id} user={u} />
        ))}
      </ul>
    </div>
  );
};

export default UserListComponent;
