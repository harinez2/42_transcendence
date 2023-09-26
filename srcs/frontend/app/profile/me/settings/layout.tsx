import React from "react";
import HeaderMenu from "../../../components/headermenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Because HaderMenu is set `absolute`,
  // we have to manually adjust the position based on the height
  // - HeaderMenu: 100px
  // - p-8 : 32px * 2 = 64px
  return (
    <>
      <HeaderMenu />
      <div
        style={{ marginTop: "100px", minHeight: "calc(100vh - 164px)" }}
        className="bg-darkslategray-100 p-8 text-left font-body text-xl text-base-white"
      >
        {children}
      </div>
    </>
  );
}
