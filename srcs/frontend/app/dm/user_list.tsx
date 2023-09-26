import Image from "next/image";
import { DmChannelType } from "./types";
import { ProfileType } from "../types";
import useModal from "../components/useModal";
import MAddUserDm from "./m-add-user-dm";

const UserComponent = ({
  profile,
  channel,
  onSelectChannel,
}: {
  profile: ProfileType;
  channel: DmChannelType;
  onSelectChannel: (c: DmChannelType) => void; // eslint-disable-line no-unused-vars
}) => {
  const handleClick = () => {
    onSelectChannel(channel);
  };

  const user_name =
    channel.user1.id === profile.userId
      ? channel.user2.username
      : channel.user1.username;

  return (
    <>
      <li>
        <a
          href="#"
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
          onClick={handleClick}
        >
          <Image
            src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
          />
          <span className="ml-3 shrink-0 pr-8 text-xl">{user_name}</span>
        </a>
      </li>
    </>
  );
};

const UserListComponent = ({
  profile,
  channels,
  onSelectChannel,
  onUpdateChannel,
}: {
  profile: ProfileType;
  channels: DmChannelType[];
  onSelectChannel: (c: DmChannelType) => void; // eslint-disable-line no-unused-vars
  onUpdateChannel: () => void;
}) => {
  const { ref, showModal, closeModal } = useModal();

  return (
    <div className="relative h-full overflow-y-auto bg-darkslategray-200 px-3 py-4">
      <ul className="divide-y divide-gray-500/30">
        {channels?.map((c) => (
          <UserComponent
            key={c.channelId}
            profile={profile}
            channel={c}
            onSelectChannel={onSelectChannel}
          />
        ))}
      </ul>
      <button
        className="fixed bottom-5 ml-6 h-[38px] w-[160px] cursor-pointer items-center justify-center  rounded-[5px] bg-neutral-400"
        onClick={showModal}
      >
        <div className="text-center text-xl font-normal tracking-widest text-white">
          Add user
        </div>
      </button>
      <dialog
        onClick={closeModal}
        ref={ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-darkslategray-100 px-6 py-2"
      >
        <MAddUserDm
          onClose={closeModal}
          onUpdateChannel={onUpdateChannel}
        />
      </dialog>
    </div>
  );
};

export default UserListComponent;
