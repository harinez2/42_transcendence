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
      className="absolute top-[405px] left-[310px] bg-darkslategray-100 w-[843px] h-[153px] flex flex-col py-6 pr-[41px] pl-[43px] box-border items-start justify-start gap-[41px] text-left text-xl text-base-white font-body"
      style={post3Style}
    >
      <div
        className="w-[321px] h-[58px] overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[16px]"
        style={frameStyle}
      >
        <img
          className="relative w-[45px] h-[45px]"
          alt=""
          src={dimensionCode}
        />
        <div
          className="w-[260px] h-[58px] overflow-hidden shrink-0 flex flex-col items-start justify-start gap-[12px]"
          style={frame1Style}
        >
          <div
            className="w-[260px] h-[23px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[16px]"
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
        className="relative box-border w-[761px] h-px border-t-[1px] border-solid border-gray-100"
        style={lineDivStyle}
      />
    </div>
  );
};

export default MsgContainer;
