import React from "react";
import Navbar from "../partials/Navbar";

const PageLayout = ({ children }) => {
  return (
    <div className="bg-[#16161b] overflow-hidden mx-auto h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default PageLayout;
