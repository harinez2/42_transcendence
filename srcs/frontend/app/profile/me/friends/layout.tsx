import { Metadata } from "next";
import React from "react";

import "../../../../styles/global.css";

export const metadata: Metadata = {
  title: "ft_transcendence",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return { children };
};

export default Layout;
