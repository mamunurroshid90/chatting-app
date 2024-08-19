import React from "react";
import { EmojiIcon } from "../../svg/Smile";
import { GalleryIcon } from "../../svg/Gallery";

const Chatting = () => {
  return (
    <>
      <div className=" w-full bg-white">
        <div className=" py-4 px-6 bg-[#212121] rounded-s-md rounded-r-md">
          <div className=" flex items-center gap-x-2">
            <div className=" w-10 h-10 rounded-full bg-orange-200 overflow-hidden"></div>
            <div>
              <span className=" font-fontRegular text-white">Mamunur</span>
            </div>
          </div>
        </div>
        <div className=" h-[430px] bg-[#fbfbfbfb] px-6">say something</div>
        <div className=" bg-[#f5f5f5] py-4">
          <div className=" bg-white w-[532px] mx-auto rounded-md py-3 flex items-center justify-center gap-x-5">
            <div className=" flex items-center gap-x-2 w-[15%]">
              <EmojiIcon />
              <GalleryIcon />
            </div>
            <input
              type="text"
              placeholder="type something"
              className=" w-[60%] p-1 outline-none"
            />
            <div className=" w-[15%]">
              <button className=" bg-[#4A81D3] px-4 py-2 rounded-md font-fontRegular text-sm text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
