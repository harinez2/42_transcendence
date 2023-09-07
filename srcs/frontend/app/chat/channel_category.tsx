import { useCallback } from "react";
import useModal from "../components/useModal";


const ChannelCategory = ({ categoryName }: { categoryName: string }) => {
  const { ref, showModal, closeModal } = useModal();

  // dialog の外側をクリックしたときに閉じるために使用する
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <span className="flex flex-row items-center justify-between p-2 font-bold uppercase text-gray-500">
      <div>{categoryName}</div>
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
      <dialog
        onClick={closeModal}
        ref={ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-gray-600"
      >
        {/* NOTE: dialog の中身 */}
        <div onClick={stopPropagation} className="flex flex-col text-white px-6 py-2">
          <div className="text-lg">Create Channel</div>
          <div className="flex flex-row justify-between">
            <div className="text-sm">Channel Name: </div>
            <input
              className="rounded-md bg-gray-500 px-2 text-white"
              type="text"
              placeholder="Channel Name"
            />
          </div>
          <div className="flex flex-row justify-end">
            <button className="m-2 rounded-md bg-gray-400 px-2 text-white">
              Create
            </button>
            <button className="m-2 rounded-md bg-gray-500 px-2 text-white">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </span>
  );
};
