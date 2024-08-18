import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className=" relative w-full h-screen">
        <div className=" h-[400px] w-full bg-black"></div>
        <div className=" w-3/4 pb-5 bg-white rounded-md absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
