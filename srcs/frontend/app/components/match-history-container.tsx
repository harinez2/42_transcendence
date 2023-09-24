// "use client";

import React from "react";
// import { useState, useCallback } from "react";
async function MatchHistoryContainer({ userId }: any) {
  // eslint-disable-line no-unused-vars
  // const prof: ProfileType = await getProfileByUserId(userId);

  // const [isMUserOpsDMOpen, setMUserOpsDMOpen] = useState(false);

  // const openMUserOpsDM = useCallback(() => {
  //   setMUserOpsDMOpen(true);
  // }, []);

  // const closeMUserOpsDM = useCallback(() => {
  //   setMUserOpsDMOpen(false);
  // }, []);

  return (
    <div>
      <div className="absolute left-[481px] top-[806px] tracking-[0.1em]">
        Match history
      </div>
      <div className="absolute left-[479px] top-[866px] flex h-[45px] w-[490px] flex-row items-center justify-start gap-[67px]">
        <div className="flex h-[45px] w-[116px] shrink-0 flex-row items-center justify-start gap-[13px] overflow-hidden">
          <img
            className="relative h-[45px] w-[45px] cursor-pointer"
            alt=""
            src="/icon2.svg"
            // onClick={openMUserOpsDM}
          />
          <div className="relative tracking-[0.1em]">user2</div>
        </div>
        <div className="flex h-[23px] w-[307px] shrink-0 flex-row items-center justify-start gap-[45px] overflow-hidden">
          <b className="relative tracking-[0.1em]">win</b>
          <div className="flex h-[23px] w-[226px] flex-row items-center justify-start gap-[41px] overflow-hidden">
            <div className="relative tracking-[0.1em]">7 - 2</div>
            <div className="relative tracking-[0.1em] text-silver-100">
              2023/07/16
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[479px] top-[943px] flex h-[45px] w-[489px] flex-row items-center justify-start gap-[68px]">
        <div className="flex h-[45px] w-[114px] shrink-0 flex-row items-center justify-start gap-[11px] overflow-hidden">
          <img
            className="relative h-[45px] w-[45px] cursor-pointer"
            alt=""
            src="/icon3.svg"
            // onClick={openMUserOpsDM}
          />
          <div className="relative tracking-[0.1em]">user4</div>
        </div>
        <div className="flex h-[23px] w-[307px] flex-row items-center justify-start gap-[46px] overflow-hidden">
          <div className="relative tracking-[0.1em]">lose</div>
          <div className="flex h-[23px] w-[226px] flex-row items-center justify-start gap-[41px] overflow-hidden">
            <div className="relative tracking-[0.1em]">3 - 5</div>
            <div className="relative tracking-[0.1em] text-silver-100">
              2023/07/15
            </div>
          </div>
        </div>
      </div>
      {/* {isMUserOpsDMOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOpsDM}
        >
          <MUserOpsDM onClose={closeMUserOpsDM} />
        </ModalPopup>
      )} */}
    </div>
  );
}

export default MatchHistoryContainer;
