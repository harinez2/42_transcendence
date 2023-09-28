import "../styles/globals.css";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="m-0">{children}</body>
    </html>
  );
};

export default RootLayout;
