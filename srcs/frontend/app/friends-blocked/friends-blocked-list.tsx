"use client";

import React from 'react';
import type { NextPage } from "next";

const FriendsBlockedList: NextPage = () => {
  return (
      <>
      <div className="absolute top-[50px] left-[5px] h-[219px] flex flex-col items-center justify-center gap-[5px]">
            <div className="relative w-[505px] h-[107px] overflow-hidden shrink-0">
              <div className="absolute h-[70.76%] w-[99.01%] top-[29.25%] right-[0.79%] bottom-[0%] left-[0.2%]">
                <div className="absolute h-[30.67%] w-[11.79%] top-[0%] left-[15.45%] tracking-[0.1em] inline-block">
                  user5
                </div>
                <div className="absolute h-[30.67%] w-[13.62%] top-[30.67%] left-[15.45%] tracking-[0.1em] text-darkgray-200 inline-block">
                  Online
                </div>
                <img
                  className="absolute h-3/5 w-[9.14%] top-[0%] right-[87.4%] bottom-[40%] left-[3.46%] max-w-full overflow-hidden max-h-full"
                  alt=""
                  src="/icon3.svg"
                />
                <img
                  className="absolute h-[2.65%] top-[97.34%] bottom-[0.01%] left-[calc(50%_-_250px)] max-h-full w-[500px]"
                  alt=""
                  src="/line-22.svg"
                />

                <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[1.71px] right-[10px] w-[185px] h-[41px]">
                  <img
                    className="absolute top-[0px] right-[0px] w-[185px] h-[41px]"
                    alt=""
                    src="/rectangle-125.svg"
                  />
                  <div className="absolute top-[11px] right-[6px] text-base tracking-[0.1em] font-body text-base-white text-left inline-block w-[161px] h-[25px]">
                    Unblock this user
                  </div>
                </button>
              </div>
            </div>
            <div className="relative w-[504px] h-[107px] overflow-hidden shrink-0">
              <div className="absolute h-[70.1%] w-[99.21%] top-[29.91%] right-[0.79%] bottom-[0%] left-[0%]">
                <div className="absolute w-[11.76%] top-[0%] left-[15.62%] tracking-[0.1em] inline-block">
                  user6
                </div>
                <img
                  className="absolute h-3/5 top-[0%] bottom-[40%] left-[18px] max-h-full w-[45px]"
                  alt=""
                  src="/icon4.svg"
                />
                <img
                  className="absolute h-[2.67%] top-[97.33%] bottom-[0.01%] left-[calc(50%_-_250px)] max-h-full w-[500px]"
                  alt=""
                  src="/line-22.svg"
                />
                <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[2px] right-[10px] w-[185px] h-[41px]">
                  <img
                    className="absolute top-[0px] right-[0px] w-[185px] h-[41px]"
                    alt=""
                    src="/rectangle-1211.svg"
                  />
                  <div className="absolute top-[11px] right-[6px] text-base tracking-[0.1em] font-body text-base-white text-left inline-block w-[161px] h-[25px]">
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