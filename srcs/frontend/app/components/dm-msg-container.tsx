import React from "react";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type DMMsgContainerType = {
  dateTime?: string;
  dmScreenText?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
  propGap?: CSSProperties["gap"];
};

const DMMsgContainer: NextPage<DMMsgContainerType> = ({
  dateTime,
  dmScreenText,
  propTop,
  propGap,
}) => {
  const post1Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      gap: propGap,
    };
  }, [propTop, propGap]);

  return (
    <div
      className="absolute left-[310px] top-[99px] box-border flex h-[153px] w-[1130px] flex-col items-start justify-start gap-[54px] bg-darkslategray-100 pb-[17px] pl-[43px] pr-[42px] pt-6 text-left font-body text-xl text-base-white"
      style={post1Style}
    >
      <div className="flex h-[58px] w-[329px] shrink-0 flex-row items-start justify-start gap-[16px] overflow-hidden">
        <img className="relative h-[45px] w-[45px]" alt="" src="/icon1.svg" />
        <div className="flex h-[58px] w-[300px] shrink-0 flex-col items-start justify-start gap-[12px] overflow-hidden">
          <div className="flex h-[23px] w-[300px] shrink-0 flex-row items-center justify-start gap-[24px] overflow-hidden">
            <div className="relative tracking-[0.1em]">user1</div>
            <div className="relative text-base tracking-[0.1em] text-darkgray-100">
              {dateTime}
            </div>
          </div>
          <div className="relative tracking-[0.1em]">{dmScreenText}</div>
        </div>
      </div>
      <div className="relative box-border h-px w-[1045px] border-t-[1px] border-solid border-gray-100" />
    </div>
  );
};

export default DMMsgContainer;
