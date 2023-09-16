import React from "react";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type MUserOpsType = {
  onClose?: () => void;
};

const MUserOps: NextPage<MUserOpsType> = ({ onClose }) => {
  const router = useRouter();

  const onSeeProfileClick = useCallback(() => {
    router.push("/../profile/other");
  }, [router]);

  const onSendDMClick = useCallback(() => {
    router.push("/../dm");
  }, [router]);

  const onAddFriendClick = useCallback(() => {
    router.push("/../chat");
  }, [router]);

  const onInviteToGameClick = useCallback(() => {
    router.push("/../game/settings");
  }, [router]);

  const onBlockThisUserClick = useCallback(() => {
    router.push("/../chat");
  }, [router]);

  return (
    <div className="relative box-border flex h-[482px] max-h-full w-[390px] max-w-full flex-col items-start justify-start overflow-hidden bg-darkslategray-100 px-10 py-[34px] text-left font-body text-5xl text-white">
      <div className="relative inline-block h-80 w-32 tracking-[0.1em]">
        User ops
      </div>
      <div className="relative inline-block h-20 w-32 tracking-[0.1em]"></div>
      <div className="mt-[-338px] box-border flex h-[432px] flex-col items-start justify-center gap-[28px] self-stretch px-0 py-2.5">
        <div className="relative h-[43px] w-[174px]">
          <button
            className="absolute h-[43px] w-[174px] cursor-pointer bg-[transparent] p-0 [border:none]"
            onClick={onSeeProfileClick}
          >
            <img
              className="absolute left-[0px] top-[0px] h-[41px] w-[174px]"
              alt=""
              src="/rectangle-1221.svg"
            />
            <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[142px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
              See Profile
            </div>
          </button>
        </div>
        <div className="relative h-[41px] w-44">
          <button
            className="absolute h-[43px] w-[174px] cursor-pointer bg-[transparent] p-0 [border:none]"
            onClick={onSendDMClick}
          >
            <img
              className="absolute left-[0px] top-[0px] h-[41px] w-[174px]"
              alt=""
              src="/rectangle-1221.svg"
            />
            <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[142px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
              Send DM
            </div>
          </button>
        </div>
        <div className="relative h-[42px] w-44">
          <button
            className="absolute h-[43px] w-[174px] cursor-pointer bg-[transparent] p-0 [border:none]"
            onClick={onAddFriendClick}
          >
            <img
              className="absolute left-[0px] top-[0px] h-[41px] w-[174px]"
              alt=""
              src="/rectangle-1221.svg"
            />
            <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[142px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
              Add friend
            </div>
          </button>
        </div>
        <div className="relative h-[42px] w-[272px]">
          <button
            className="absolute h-[43px] w-[174px] cursor-pointer bg-[transparent] p-0 [border:none]"
            onClick={onInviteToGameClick}
          >
            <img
              className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
              alt=""
              src="/rectangle-124.svg"
            />
            <div className="absolute left-[16px] top-[9px] inline-block h-[34px] w-[248px] text-left font-body text-5xl tracking-[0.1em] text-base-white">
              Invite to Game
            </div>
          </button>
        </div>
        <button
          className="relative h-[42px] w-[272px] cursor-pointer bg-[transparent] p-0 [border:none]"
          onClick={onBlockThisUserClick}
        >
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
            alt=""
            src="/rectangle-124.svg"
          />
          <div className="absolute left-[24px] top-[8px] inline-block h-[34px] w-[248px] text-left font-body text-5xl tracking-[0.1em] text-white">
            Block this user
          </div>
        </button>
      </div>
    </div>
  );
};

export default MUserOps;
