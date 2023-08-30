import type { NextPage } from "next";

type MUserOpsType = {
  onClose?: () => void;
};

const MUserOps: NextPage<MUserOpsType> = ({ onClose }) => {
  return (
    <div className="bg-darkslategray-100 font-body relative box-border flex h-[482px] max-h-full w-[390px] max-w-full flex-col items-start justify-start overflow-hidden px-10 py-[34px] text-left text-5xl text-white">
      <div className="relative inline-block h-80 w-28 shrink-0 tracking-[0.1em]">
        User ops
      </div>
      <div className="mt-[-338px] box-border flex h-[432px] flex-col items-start justify-center gap-[28px] self-stretch px-0 py-2.5">
        <div className="relative h-[43px] w-[174px]">
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-[174px]"
            alt=""
            src="/rectangle-122.svg"
          />
          <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[142px] tracking-[0.1em]">
            See Profile
          </div>
        </div>
        <div className="relative h-[41px] w-44">
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-44"
            alt=""
            src="/rectangle-123.svg"
          />
          <div className="absolute left-[21px] top-[8px] inline-block h-[27px] w-[139px] tracking-[0.1em]">
            Send DM
          </div>
        </div>
        <div className="relative h-[42px] w-44">
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-44"
            alt=""
            src="/rectangle-123.svg"
          />
          <div className="absolute left-[23.9px] top-[8px] inline-block h-[34px] w-[147.1px] tracking-[0.1em]">
            Add friend
          </div>
        </div>
        <div className="relative h-[42px] w-[272px]">
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
            alt=""
            src="/rectangle-124.svg"
          />
          <div className="absolute left-[24px] top-[8px] inline-block h-[34px] w-[248px] tracking-[0.1em]">
            Invite to Game
          </div>
        </div>
        <button className="relative h-[42px] w-[272px] cursor-pointer bg-[transparent] p-0 [border:none]">
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
            alt=""
            src="/rectangle-124.svg"
          />
          <div className="font-body absolute left-[24px] top-[8px] inline-block h-[34px] w-[248px] text-left text-5xl tracking-[0.1em] text-white">
            Block this user
          </div>
        </button>
      </div>
    </div>
  );
};

export default MUserOps;
