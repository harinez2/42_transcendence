import React from "react";
import Header from "../../compontents/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default Layout;
