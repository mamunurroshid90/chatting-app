import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();

  // show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      const friendReq = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().receiverId) {
          friendReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestList(friendReq);
    });
  }, [db, user.uid]);

  // console.log(friendRequestList);
  return (
    <>
      <div className=" shadow-md bg-white rounded-md p-5 h-[600px] overflow-y-auto">
        <h2 className=" font-fontBold text-black text-xl">Friend Request</h2>

        {friendRequestList?.map((item) => (
          <div
            className=" flex items-center justify-between gap-x-2"
            key={item.id}
          >
            <div className=" flex items-center gap-x-2 mt-3">
              <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden"></div>
              <div className=" font-fontRegular text-black text-md">
                <h3>{item.senderName} </h3>
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
        ))}
      </div>
    </>
  );
};

export default FriendRequest;
