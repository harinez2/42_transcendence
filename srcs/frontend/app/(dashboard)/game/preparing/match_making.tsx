import { WaitStatus } from "../types";

const LeaveTheQueueButton = ({
  closeModal,
  isDisabled,
}: {
  closeModal: () => void;
  isDisabled: boolean;
}) => {
  const buttonClass = `absolute left-[118px] top-[252px] h-[41px] w-[253.83px] bg-[transparent] p-0 [border:none] ${
    isDisabled ? "cursor-not-allowed" : "cursor-pointer"
  }`;
  const imgSrc = isDisabled ? "/rectangle-127.svg" : "/rectangle-12111.svg";

  return (
    <button className={buttonClass} onClick={closeModal} disabled={isDisabled}>
      <img
        className="absolute left-[0px] top-[0px] h-[41px] w-[253.83px]"
        alt=""
        src={imgSrc}
      />
      <div className="absolute left-[25px] top-[7px] inline-block h-[34px] w-[213px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
        leave the queue
      </div>
    </button>
  );
};

const MatchMakingDialog = ({
  closeModal,
  stopPropagation,
  settingStatus,
}: any) => {
  return (
    <div
      onClick={stopPropagation}
      className="relative h-[338px] w-[420px] overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-base-white"
    >
      <div className="absolute left-[27px] top-[30px] tracking-[0.1em]">
        Match making
      </div>
      <div className="absolute left-[57px] top-[104px] inline-block w-[390px] tracking-[0.1em]">
        looking for a opponent...
      </div>
      {settingStatus === WaitStatus.WaitingForOpponentSetting && (
        <>
          <div className="absolute left-[57px] top-[154px] inline-block w-[390px] tracking-[0.1em]">
            waiting for the opponent setting up the game...
            <br />
          </div>
          <LeaveTheQueueButton closeModal={closeModal} isDisabled={true} />
        </>
      )}
      {settingStatus !== WaitStatus.WaitingForOpponentSetting && (
        <LeaveTheQueueButton closeModal={closeModal} isDisabled={false} />
      )}
    </div>
  );
};

export default MatchMakingDialog;
