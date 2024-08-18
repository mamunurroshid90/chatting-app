import React from "react";
import UserList from "../components/userList/UserList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";

const Home = () => {
  return (
    <>
      <div className=" grid grid-cols-[2fr,5fr]">
        <div className=" w-full">
          <UserList />
        </div>
        <div className=" w-full grid grid-cols-2 gap-x-6">
          <div>
            <FriendRequest />
          </div>
          <div>
            <Friends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
