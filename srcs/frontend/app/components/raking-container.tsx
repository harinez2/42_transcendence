import React from "react";

// eslint-disable-next-line no-unused-vars
async function RankingContainer({ userId }: any) {
  // const prof: ProfileType = await getProfileByUserId(userId); //unused yet.

  return (
    <div className="absolute left-[590px] top-[506px] h-[227px] w-[229px]">
      <div className="absolute left-[1px] top-[0px] flex h-14 w-[228px] flex-row items-center justify-start gap-[66px] overflow-hidden">
        <div className="relative tracking-[0.1em]">ranking</div>
        <div className="relative text-29xl tracking-[0.1em]">1/5</div>
      </div>
      <div className="absolute left-[5px] top-[83px] flex h-14 w-[212px] flex-row items-center justify-start gap-[118px] overflow-hidden">
        <div className="relative tracking-[0.1em]">win</div>
        <div className="relative text-29xl tracking-[0.1em]">12</div>
      </div>
      <div className="absolute left-[0px] top-[171px] flex h-14 w-[201px] flex-row items-center justify-start gap-[130px] overflow-hidden">
        <div className="mb-[11px] inline-block w-[34px] tracking-[0.1em]">
          lose
        </div>
        <div className="relative text-29xl tracking-[0.1em]">3</div>
      </div>
    </div>
  );
}

export default RankingContainer;
