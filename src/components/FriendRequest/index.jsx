import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatarImg from "../../assets/avatar.jpg";

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

  // Accept request handle
  const handleAccept = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.id));
    });
  };

  // reject friend request handle
  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };
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
              <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden">
                <img
                  src={item.currentProfile || avatarImg}
                  alt=""
                  className=" w-full h-full object-cover"
                />
              </div>
              <div className=" font-fontRegular text-black text-md">
                <h3>{item.senderName} </h3>
              </div>
            </div>
            <div className=" flex items-center gap-x-2">
              <button
                className=" bg-[#4A81D3] text-white px-4 py-2 rounded-md font-fontRegular"
                onClick={() => handleAccept(item)}
              >
                Accept
              </button>
              <button
                className=" bg-[#D34A4A] text-white px-4 py-2 rounded-md font-fontRegular"
                onClick={() => handleReject(item)}
              >
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
