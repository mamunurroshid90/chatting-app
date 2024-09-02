import React, { useEffect, useState } from "react";
import { AddFriendIcon } from "../../svg/AddFriend";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import avatarImg from "../../assets/avatar.jpg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [cancelFriendReq, setCancelFriendReq] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  const storage = getStorage();
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          getDownloadURL(Ref(storage, userList.key))
            .then((downloadURL) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  // sent friendRequest handler

  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest")), {
      senderName: user.displayName,
      senderId: user.uid,
      currentProfile: user.photoURL ?? "/src/assets/avatar.jpg",
      receiverName: data.username,
      receiverId: data.id,
      receiverProfile: data.photoURL ?? "/src/assets/avatar.jpg",
    });
  };

  // show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancelReq = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().senderId);
        cancelReq.push({ ...item.val(), id: item.key });
      });
      setFriendRequestList(reqArr);
      setCancelFriendReq(cancelReq);
    });
  }, [db]);

  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelFriendReq.find(
      (req) => req.receiverId === itemId && req.senderId === user.uid
    );
    if (reqToCancel) {
      remove(ref(db, "friendRequest/" + reqToCancel.id));
    }
  };

  return (
    <>
      <div className=" px-7 pt-3 h-[600px] bg-[#FBFBFB]">
        <h2 className=" font-fontBold text-black text-xl">All user</h2>
        {users.map((item, index) => (
          <div key={index} className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-x-2">
              <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden">
                <img
                  src={item.photoURL || avatarImg}
                  alt=""
                  className=" w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className=" font-fontRegular text-lg text-black">
                  {item.username}
                </h3>
              </div>
            </div>
            {friendRequestList.includes(item.id + user.uid) ||
            friendRequestList.includes(user.uid + item.id) ? (
              <button
                className=" px-4 py-2 rounded-md bg-gray-400 text-white font-medium font-fontRegular"
                onClick={() => handleCancelReq(item.id)}
              >
                Cancel Request
              </button>
            ) : (
              <div
                className=" text-black cursor-pointer"
                onClick={() => handleFriendRequest(item)}
              >
                <AddFriendIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
