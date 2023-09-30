import React from "react";
import useModal from "../components/useModal";
import { ChannelType } from "./types";
import MCreateChannel from "../components/modal/m-create-channel";

const ChannelCategory = ({
  categoryName,
  channels,
  setChannels,
}: {
  categoryName: string;
  channels: ChannelType[];
  setChannels: (channels: ChannelType[]) => void; // eslint-disable-line no-unused-vars
}) => {
  const { ref, showModal, closeModal } = useModal();
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
    closeModal();
  };
  const openModal = () => {
    setOpen(true);
    showModal();
  };

  return (
    <span className="flex flex-row items-center justify-between p-2 font-bold uppercase text-gray-500">
      <div>{categoryName}</div>
      <ShowDialogButton showModal={openModal} />

      <dialog
        onClick={onClose}
        ref={ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-gray-600"
      >
        <MCreateChannel
          isClose={!open}
          closeModal={onClose}
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

export default ChannelCategory;
