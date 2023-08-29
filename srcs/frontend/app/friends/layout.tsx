import { Metadata } from "next";
import React from "react";

import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "ft_transcendence",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
