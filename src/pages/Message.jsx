import React from "react";
import Friends from "../components/Friends";
import Chatting from "../components/Chatting";

const Message = () => {
  return (
    <>
      <div className=" grid grid-cols-[2fr,5fr]">
        <div className=" w-full">
          <Friends />
        </div>
        <div className=" w-full pr-4 pt-2">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Message;
