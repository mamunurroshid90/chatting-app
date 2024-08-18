import React from "react";

const FriendRequest = () => {
  return (
    <>
      <div className=" shadow-md bg-white rounded-md p-5 h-[600px] overflow-y-auto">
        <h2 className=" font-fontBold text-black text-xl">Friend Request</h2>
        <div className=" flex items-center justify-between gap-x-2">
          <div className=" flex items-center gap-x-2 mt-3">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div className=" font-fontRegular text-black text-md">
              <h3>Mamunur Roshid</h3>
            </div>
          </div>
          <div className=" flex items-center gap-x-2">
            <button className=" bg-[#4A81D3] text-white px-4 py-2 rounded-md font-fontRegular">
              Accept
            </button>
            <button className=" bg-[#D34A4A] text-white px-4 py-2 rounded-md font-fontRegular">
              Reject
            </button>
          </div>
        </div>
        <div className=" flex items-center justify-between gap-x-2">
          <div className=" flex items-center gap-x-2 mt-3">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div className=" font-fontRegular text-black text-md">
              <h3>Mamunur Roshid</h3>
            </div>
          </div>
          <div className=" flex items-center gap-x-2">
            <button className=" bg-[#4A81D3] text-white px-4 py-2 rounded-md font-fontRegular">
              Accept
            </button>
            <button className=" bg-[#D34A4A] text-white px-4 py-2 rounded-md font-fontRegular">
              Reject
            </button>
          </div>
        </div>
        <div className=" flex items-center justify-between gap-x-2">
          <div className=" flex items-center gap-x-2 mt-3">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div className=" font-fontRegular text-black text-md">
              <h3>Mamunur Roshid</h3>
            </div>
          </div>
          <div className=" flex items-center gap-x-2">
            <button className=" bg-[#4A81D3] text-white px-4 py-2 rounded-md font-fontRegular">
              Accept
            </button>
            <button className=" bg-[#D34A4A] text-white px-4 py-2 rounded-md font-fontRegular">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
