"use client";

import React from "react";
import type { NextPage } from "next";

const FriendsBlockedList: NextPage = () => {
  return (
    <>
      <div className="absolute left-[5px] top-[50px] flex h-[219px] flex-col items-center justify-center gap-[5px]">
        <div className="relative h-[107px] w-[505px] shrink-0 overflow-hidden">
          <div className="absolute bottom-[0%] left-[0.2%] right-[0.79%] top-[29.25%] h-[70.76%] w-[99.01%]">
            <div className="absolute left-[15.45%] top-[0%] inline-block h-[30.67%] w-[11.79%] tracking-[0.1em]">
              user5
            </div>
            <div className="absolute left-[15.45%] top-[30.67%] inline-block h-[30.67%] w-[13.62%] tracking-[0.1em] text-darkgray-200">
              Online
            </div>
            <img
              className="absolute bottom-[40%] left-[3.46%] right-[87.4%] top-[0%] h-3/5 max-h-full w-[9.14%] max-w-full overflow-hidden"
              alt=""
              src="/icon3.svg"
            />
            <img
              className="absolute bottom-[0.01%] left-[calc(50%_-_250px)] top-[97.34%] h-[2.65%] max-h-full w-[500px]"
              alt=""
              src="/line-22.svg"
            />

            <button className="absolute right-[10px] top-[1.71px] h-[41px] w-[185px] cursor-pointer bg-[transparent] p-0 [border:none]">
              <img
                className="absolute right-[0px] top-[0px] h-[41px] w-[185px]"
                alt=""
                src="/rectangle-125.svg"
              />
              <div className="absolute right-[6px] top-[11px] inline-block h-[25px] w-[161px] text-left font-body text-base tracking-[0.1em] text-base-white">
                Unblock this user
              </div>
            </button>
          </div>
        </div>
        <div className="relative h-[107px] w-[504px] shrink-0 overflow-hidden">
          <div className="absolute bottom-[0%] left-[0%] right-[0.79%] top-[29.91%] h-[70.1%] w-[99.21%]">
            <div className="absolute left-[15.62%] top-[0%] inline-block w-[11.76%] tracking-[0.1em]">
              user6
            </div>
            <img
              className="absolute bottom-[40%] left-[18px] top-[0%] h-3/5 max-h-full w-[45px]"
              alt=""
              src="/icon4.svg"
            />
            <img
              className="absolute bottom-[0.01%] left-[calc(50%_-_250px)] top-[97.33%] h-[2.67%] max-h-full w-[500px]"
              alt=""
              src="/line-22.svg"
            />
            <button className="absolute right-[10px] top-[2px] h-[41px] w-[185px] cursor-pointer bg-[transparent] p-0 [border:none]">
              <img
                className="absolute right-[0px] top-[0px] h-[41px] w-[185px]"
                alt=""
                src="/rectangle-1211.svg"
              />
              <div className="absolute right-[6px] top-[11px] inline-block h-[25px] w-[161px] text-left font-body text-base tracking-[0.1em] text-base-white">
                Unblock this user
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsBlockedList;
