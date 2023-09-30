import Image from "next/image";
import { DmChannelType } from "./types";
import { ProfileType } from "@/app/types";
import MAddUserDm from "./m-add-user-dm";
import ModalPopup from "../components/modal/modal-popup";
import { useCallback, useState } from "react";

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

  const userId =
    channel.user1.id === profile.userId ? channel.user2.id : channel.user1.id;

  return (
    <>
      <li>
        <div
          className="group flex cursor-pointer items-center rounded-lg p-2 text-white hover:bg-gray-700"
          onClick={handleClick}
        >
          <Image
            src={`/api/users/avatar/${userId}`}
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
          />
          <span className="ml-3 shrink-0 pr-8 text-xl">{user_name}</span>
        </div>
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
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className="fixed h-[calc(100%_-_132px)] w-64 shrink-0 bg-darkslategray-200 px-3 py-4">
      <div className="fixed h-[calc(100%_-_132px-64px)] w-64 shrink-0 overflow-y-scroll bg-darkslategray-200">
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
          onClick={openModal}
        >
          <div className="text-center text-xl font-normal tracking-widest text-white">
            Add user
          </div>
        </button>
        {open && (
          <ModalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={onClose}
          >
            <MAddUserDm onClose={onClose} onUpdateChannel={onUpdateChannel} />
          </ModalPopup>
        )}
      </div>
    </div>
  );
};

export default UserListComponent;
