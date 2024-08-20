import React, { useRef } from "react";
import { CrossIcon } from "../../svg/Cross";
import { UploadIcon } from "../../svg/Upload";

const Modals = ({ setShow }) => {
  const fileRef = useRef(null);
  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-screen bg-[#2e2e2ef0] flex justify-center items-center">
        <div className=" w-[30%] bg-white rounded-md p-4 relative">
          <div className="">
            <h3 className=" font-fontRegular text-base text-black text-center">
              Upload Photo
            </h3>
            <div
              className=" w-6 top-1 right-1 absolute cursor-pointer hover:fill-red-600 "
              onClick={() => setShow(false)}
            >
              <CrossIcon />
            </div>
          </div>
          <div>
            <div className=" w-full border border-slate-400 rounded-md h-[400px] mt-5 p-2 box-border cursor-pointer">
              <div
                className=" bg-slate-200 rounded-md w-full h-full flex justify-center items-center"
                onClick={() => fileRef.current.click()}
              >
                <div>
                  <div className=" w-10 mx-auto">
                    <UploadIcon />
                  </div>
                  <h4>Upload your profile photo</h4>
                  <input type="file" ref={fileRef} hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;
