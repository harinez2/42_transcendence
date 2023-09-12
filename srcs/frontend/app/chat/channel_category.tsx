import React, { useCallback, useState } from "react";
import useModal from "../components/useModal";
import makeAPIRequest from "../api/api";
import { ChannelType } from "./types";

type createChannelDTO = {
  channelName: string;
  ownerId: number;
  channelType: Publicity;
  password: string | null;
};

export enum Publicity {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

const ChannelCategory = ({
  categoryName,
  channels,
  setChannels,
}: {
  categoryName: string;
  channels: ChannelType[];
  setChannels: (channels: ChannelType[]) => void;
}) => {
  const { ref, showModal, closeModal } = useModal();

  return (
    <span className="flex flex-row items-center justify-between p-2 font-bold uppercase text-gray-500">
      <div>{categoryName}</div>
      <ShowDialogButton showModal={showModal} />

      <dialog
        onClick={closeModal}
        ref={ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-gray-600"
      >
        <ChannelCreateModal
          closeModal={closeModal}
          channels={channels}
          setChannels={setChannels}
        />
      </dialog>
    </span>
  );
};

const ShowDialogButton = ({ showModal }: { showModal: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      onClick={showModal}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const ChannelCreateModal = ({
  closeModal,
  channels,
  setChannels,
}: {
  closeModal: () => void;
  channels: ChannelType[];
  setChannels: (channels: ChannelType[]) => void;
}) => {
  const [channelName, setChannelName] = useState<string>("");
  const [channelType, setChannelType] = useState<Publicity>(Publicity.PUBLIC);
  const [password, setPassword] = useState<string | null>(null);

  // dialog の外側をクリックしたときに閉じるために使用する
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  // button を click して channel を作成する
  // onclick に設定する
  // channels を更新する
  const createChannelAndSetChannels = useCallback(
    async (createChannelDto: createChannelDTO) => {
      makeAPIRequest<ChannelType>("post", "/chats", createChannelDto)
        .then((result) => {
          if (result.success) {
            console.log("channel create success:", result.data);
            setChannels([...channels, result.data]);
            closeModal();
          } else {
            console.error(result.error);
          }
        })
        .catch((err) => {
          console.error("channel create failed:", err);
        });
    },
    [channels],
  );

  // channelNameが更新されたとき dto を更新する
  const params: createChannelDTO = {
    channelName: channelName,
    ownerId: 1,
    channelType: channelType,
    password: password,
  };

  return (
    <div
      onClick={stopPropagation}
      className="flex flex-col px-6 py-2 text-white"
    >
      <div className="text-lg">Create Channel</div>
      <div className="flex flex-row justify-between">
        <div className="text-sm">Channel Name: </div>
        <input
          className="rounded-md bg-gray-500 px-2 text-white"
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={() => createChannelAndSetChannels(params)}
          className="m-2 rounded-md bg-gray-400 px-2 text-white"
        >
          Create
        </button>
        <button
          onClick={closeModal}
          className="m-2 rounded-md bg-gray-500 px-2 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChannelCategory;
