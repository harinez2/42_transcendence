import React from 'react';
import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type MUserOpsType = {
  onClose?: () => void;
};

const MUserOps: NextPage<MUserOpsType> = ({ onClose }) => {
  const router = useRouter();

  const onSeeProfileClick = useCallback(() => {
    router.push("/../profile-other");
  }, [router]);

  const onSendDMClick = useCallback(() => {
    router.push("/../dm");
  }, [router]);
  
  const onAddFriendClick = useCallback(() => {
   router.push("/../chat");
  }, [router]);
  
  const onInviteToGameClick = useCallback(() => {
    router.push("/../game-settings");
  }, [router]);
  
  const onBlockThisUserClick = useCallback(() => {
    router.push("/../chat");
  }, [router]);

  return (
    <div className="bg-darkslategray-100 font-body relative box-border flex h-[482px] max-h-full w-[390px] max-w-full flex-col items-start justify-start overflow-hidden px-10 py-[34px] text-left text-5xl text-white">
      <div className="relative inline-block h-80 w-32 tracking-[0.1em]">
        User ops
      </div>
      <div className="relative inline-block h-20 w-32 tracking-[0.1em]">
      </div>
      <div className="mt-[-338px] box-border flex h-[432px] flex-col items-start justify-center gap-[28px] self-stretch px-0 py-2.5">
        <div className="relative h-[43px] w-[174px]">
          <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[174px] h-[43px]"
          onClick={onSeeProfileClick}
          >
          <img
            className="absolute top-[0px] left-[0px] w-[174px] h-[41px]"
            alt=""
            src="/rectangle-1221.svg"
          />
          <div className="absolute top-[9px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[142px] h-[34px]">
            See Profile
          </div>
          </button>
        </div>
        <div className="relative h-[41px] w-44">
          <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[174px] h-[43px]"
          onClick={onSendDMClick}
          >
          <img
            className="absolute top-[0px] left-[0px] w-[174px] h-[41px]"
            alt=""
            src="/rectangle-1221.svg"
          />
          <div className="absolute top-[9px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[142px] h-[34px]">
            Send DM
          </div>
          </button>
        </div>
        <div className="relative h-[42px] w-44">
          <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[174px] h-[43px]"
          onClick={onAddFriendClick}
          >
          <img
            className="absolute top-[0px] left-[0px] w-[174px] h-[41px]"
            alt=""
            src="/rectangle-1221.svg"
          />
          <div className="absolute top-[9px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[142px] h-[34px]">
            Add friend
          </div>
          </button>
        </div>
        <div className="relative h-[42px] w-[272px]">
          <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] absolute w-[174px] h-[43px]"
          onClick={onInviteToGameClick}
          >
          <img
            className="absolute left-[0px] top-[0px] h-[41px] w-[272px]"
            alt=""
            src="/rectangle-124.svg"
          />
          <div className="absolute top-[9px] left-[16px] text-5xl tracking-[0.1em] font-body text-base-white text-left inline-block w-[248px] h-[34px]">
            Invite to Game
          </div>
          </button>
        </div>
        <button className="relative h-[42px] w-[272px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={onBlockThisUserClick}
        >
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
