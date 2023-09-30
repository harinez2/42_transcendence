"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Socket } from "socket.io-client";
import { ProfileType } from "@/app/types";
import MChatChannelOps from "../components/modal/m-chat-channel-ops";
import { ChannelType } from "./types";
import { UserType } from "@/app/types";
import MUserOps from "../components/modal/m-user-ops";
import ModalPopup from "../components/modal/modal-popup";

export interface UserProps {
  user: UserType | undefined; // TODO: checkお願いします！ by tsudo
  router: AppRouterInstance;
  socket: Socket;
  profile: ProfileType;
  channel: ChannelType | null;
}

const UserComponent = ({
  user,
  router,
  socket,
  profile,
  channel,
}: UserProps) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  if (!user) {
    return <></>; // TODO: checkお願いします！ by tsudo
  }

  return (
    <div className="flex">
      <button
        onClick={openMUserOps}
        className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
      >
        <Image
          src={`/api/users/avatar/${user.id}?stamp=${user.updated}`}
          className="h-auto max-w-full rounded-full"
          width={30}
          height={30}
          alt="User Avatar"
        />
        <span className="ml-3 shrink-0 pr-8 text-black">{user?.username}</span>
      </button>

      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps
            onClose={closeMUserOps}
            user={user}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}

      <ShowSettingComponent
        user={user}
        router={router}
        socket={socket}
        profile={profile}
        channel={channel}
      />
    </div>
  );
};

// NOTE: User をクリックしたときに表示される dialog
const ShowSettingComponent = ({
  user,
  router,
  socket,
  profile,
  channel,
}: UserProps) => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <>
      {user?.id !== profile.userId && (
        <button
          onClick={openModal}
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
        >
          <SettingIcon />
        </button>
      )}

      {open && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={onClose}
        >
          <MChatChannelOps
            onClose={onClose}
            stopPropagation={stopPropagation}
            user={user}
            router={router}
            socket={socket}
            profile={profile}
            channel={channel}
          />
        </ModalPopup>
      )}
    </>
  );
};

const SettingIcon = () => {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      className="h-6 w-6 text-gray-500"
    >
      <g>
        <path
          d="M499.453,210.004l-55.851-2.58c-5.102-0.23-9.608-3.395-11.546-8.103l-11.508-27.695 c-1.937-4.728-0.997-10.145,2.455-13.914l37.668-41.332c4.718-5.188,4.546-13.205-0.421-18.182l-46.434-46.443
          c-4.986-4.967-13.003-5.159-18.2-0.412l-41.312,37.668c-3.778,3.443-9.206,4.402-13.924,2.436l-27.694-11.488
          c-4.718-1.946-7.864-6.454-8.094-11.565l-2.589-55.831C301.675,5.534,295.883,0,288.864,0h-65.708
          c-7.02,0-12.831,5.534-13.156,12.562l-2.571,55.831c-0.23,5.111-3.376,9.618-8.094,11.565L171.64,91.447
          c-4.737,1.966-10.165,1.007-13.924-2.436l-41.331-37.668c-5.198-4.746-13.215-4.564-18.201,0.412L51.769,98.198
          c-4.986,4.977-5.158,12.994-0.422,18.182l37.668,41.332c3.452,3.769,4.373,9.186,2.416,13.914l-11.469,27.695
          c-1.956,4.708-6.444,7.873-11.564,8.103l-55.832,2.58c-7.019,0.316-12.562,6.118-12.562,13.147v65.699
          c0,7.019,5.543,12.83,12.562,13.148l55.832,2.579c5.12,0.229,9.608,3.394,11.564,8.103l11.469,27.694
          c1.957,4.728,1.036,10.146-2.416,13.914l-37.668,41.313c-4.756,5.217-4.564,13.224,0.403,18.201l46.471,46.443
          c4.967,4.977,12.965,5.15,18.182,0.422l41.312-37.677c3.759-3.443,9.207-4.392,13.924-2.435l27.694,11.478
          c4.719,1.956,7.864,6.464,8.094,11.575l2.571,55.831c0.325,7.02,6.136,12.562,13.156,12.562h65.708
          c7.02,0,12.812-5.542,13.138-12.562l2.589-55.831c0.23-5.111,3.376-9.619,8.094-11.575l27.694-11.478
          c4.718-1.957,10.146-1.008,13.924,2.435l41.312,37.677c5.198,4.728,13.215,4.555,18.2-0.422l46.434-46.443
          c4.967-4.977,5.139-12.984,0.421-18.201l-37.668-41.313c-3.452-3.768-4.412-9.186-2.455-13.914l11.508-27.694
          c1.937-4.709,6.444-7.874,11.546-8.103l55.851-2.579c7.019-0.318,12.542-6.129,12.542-13.148v-65.699
          C511.995,216.122,506.472,210.32,499.453,210.004z M256.01,339.618c-46.164,0-83.622-37.438-83.622-83.612
          c0-46.184,37.458-83.622,83.622-83.622s83.602,37.438,83.602,83.622C339.612,302.179,302.174,339.618,256.01,339.618z"
        ></path>
      </g>
    </svg>
  );
};

export default UserComponent;
