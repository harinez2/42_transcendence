import React, { Suspense } from "react";

function Fallback() {
  return (
    <>
      <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24" />
      Processing...
    </>
  );
}

const defaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen w-full justify-center overflow-hidden bg-zinc-700 text-white">
        <div className="relative">
          <div className="h-[1092px] w-[1440px] bg-neutral-800 text-[200px]">
            <div
              className="absolute left-[720px] h-[1092px] w-0 border-0 border-l-2 border-dashed"
              style={{
                borderImage:
                  "repeating-linear-gradient(0deg, currentColor, currentColor 27px, transparent 27px, transparent 37px) 1",
              }}
            />
            <div className="absolute left-[261px] top-[21px] tracking-[0.1em] mix-blend-color-dodge">
              4
            </div>
            <div className="absolute right-[239px] top-[32px] tracking-[0.1em] mix-blend-color-dodge">
              2
            </div>
            <div className="absolute bottom-[183px] left-[0px] h-[162px] w-[27px] bg-white" />
            <div className="absolute right-[0px] top-[310px] h-[162px] w-[27px] bg-white" />
            <div className="absolute left-[calc(50%_+_235px)] top-[calc(50%_+_33px)] h-[30px] w-[30px] bg-white" />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-700">
            <Suspense fallback={<Fallback />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default defaultLayout;
