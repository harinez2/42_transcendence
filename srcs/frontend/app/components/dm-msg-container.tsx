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
      className="absolute top-[99px] left-[310px] bg-darkslategray-100 w-[1130px] h-[153px] flex flex-col pt-6 pb-[17px] pr-[42px] pl-[43px] box-border items-start justify-start gap-[54px] text-left text-xl text-base-white font-body"
      style={post1Style}
    >
      <div className="w-[329px] h-[58px] overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[16px]">
        <img
          className="relative w-[45px] h-[45px]"
          alt=""
          src="/icon1.svg"
        />
        <div className="w-[300px] h-[58px] overflow-hidden shrink-0 flex flex-col items-start justify-start gap-[12px]">
          <div className="w-[300px] h-[23px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[24px]">
            <div className="relative tracking-[0.1em]">user1</div>
            <div className="relative text-base tracking-[0.1em] text-darkgray-100">
              {dateTime}
            </div>
          </div>
          <div className="relative tracking-[0.1em]">{dmScreenText}</div>
        </div>
      </div>
      <div className="relative box-border w-[1045px] h-px border-t-[1px] border-solid border-gray-100" />
    </div>
  );
};

export default DMMsgContainer;
