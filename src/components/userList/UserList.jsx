import React from "react";
import { AddFriendIcon } from "../../svg/AddFriend";

const UserList = () => {
  return (
    <>
      <div className=" px-7 pt-3 h-[600px] bg-[#FBFBFB]">
        <h2 className=" font-fontBold text-black text-xl">All user</h2>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div>
              <h3 className=" font-fontRegular text-lg text-black">
                Mamunur Roshid
              </h3>
            </div>
          </div>
          <div className=" text-black cursor-pointer">
            <AddFriendIcon />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div>
              <h3 className=" font-fontRegular text-lg text-black">
                Sazzadur Rahman
              </h3>
            </div>
          </div>
          <div className=" text-black cursor-pointer">
            <AddFriendIcon />
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-x-2">
            <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
            <div>
              <h3 className=" font-fontRegular text-lg text-black">
                Abdullah Foysal
              </h3>
            </div>
          </div>
          <div className=" text-black cursor-pointer">
            <AddFriendIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
