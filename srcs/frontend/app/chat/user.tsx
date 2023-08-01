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

export default UserComponent;
