import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
      <div className="cr" style={{backgroundColor:"#c6dff5"}}>
          <Navbar  />
          <div className="content" >
            <main>{children}</main>
          </div>
      </div>
  );
};

export default Layout;