import React from "react";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type MsgContainerType = {
  dimensionCode?: string;
  messageContent?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propWidth2?: CSSProperties["width"];
  propWidth3?: CSSProperties["width"];
  propGap?: CSSProperties["gap"];
  propWidth4?: CSSProperties["width"];
};

const MsgContainer: NextPage<MsgContainerType> = ({
  dimensionCode,
  messageContent,
  propWidth,
  propWidth1,
  propWidth2,
  propWidth3,
  propGap,
  propWidth4,
}) => {
  const post3Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const frameStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  const frame1Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth2,
    };
  }, [propWidth2]);

  const frame2Style: CSSProperties = useMemo(() => {
    return {
      width: propWidth3,
      gap: propGap,
    };
  }, [propWidth3, propGap]);

  const lineDivStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth4,
    };
  }, [propWidth4]);

  return (
    <div
      className="absolute left-[310px] top-[405px] box-border flex h-[153px] w-[843px] flex-col items-start justify-start gap-[41px] bg-darkslategray-100 py-6 pl-[43px] pr-[41px] text-left font-body text-xl text-base-white"
      style={post3Style}
    >
      <div
        className="flex h-[58px] w-[321px] shrink-0 flex-row items-start justify-start gap-[16px] overflow-hidden"
        style={frameStyle}
      >
        <img
          className="relative h-[45px] w-[45px]"
          alt=""
          src={dimensionCode}
        />
        <div
          className="flex h-[58px] w-[260px] shrink-0 flex-col items-start justify-start gap-[12px] overflow-hidden"
          style={frame1Style}
        >
          <div
            className="flex h-[23px] w-[260px] shrink-0 flex-row items-center justify-start gap-[16px] overflow-hidden"
            style={frame2Style}
          >
            <div className="relative tracking-[0.1em]">user1</div>
            <div className="relative text-base tracking-[0.1em] text-darkgray-100">
              06/03/2023 11:30 PM
            </div>
          </div>
          <div className="relative tracking-[0.1em]">{messageContent}</div>
        </div>
      </div>
      <div
        className="relative box-border h-px w-[761px] border-t-[1px] border-solid border-gray-100"
        style={lineDivStyle}
      />
    </div>
  );
};

export default MsgContainer;
