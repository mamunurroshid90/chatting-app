import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import avatarImg from "../../assets/avatar.jpg";
import { ActiveSingle } from "../../feature/slice/ActiveSingleSlice";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const db = getDatabase();
  const dispatch = useDispatch();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderId ||
          user.uid === item.val().receiverId
        ) {
          friendArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(friendArr);
    });
  }, [db, user.uid]);

  // console.log(friends);

  const handleSingleChat = (data) => {
    if (user.uid === data.receiverId) {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.currentProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.currentProfile,
        })
      );
    } else {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
    }
  };

  return (
    <>
      <div className=" shadow-md bg-white rounded-md p-5 h-[600px] overflow-y-auto">
        <h2 className=" font-fontBold text-black text-xl">All Friends</h2>

        {friends?.map((item) => (
          <div
            className=" flex items-center justify-between gap-x-2 hover:bg-slate-200 px-4 py-2 rounded-md transition-all ease-linear duration-100 cursor-pointer"
            key={item.id}
            onClick={() => handleSingleChat(item)}
          >
            <div className=" flex items-center gap-x-2 mt-3">
              <div className=" w-12 h-12 rounded-full bg-purple-400 overflow-hidden">
                {user.uid === item.receiverId ? (
                  <img
                    src={item.currentProfile || avatarImg}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.receiverProfile || avatarImg}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                )}
              </div>
              <div className=" font-fontRegular text-black text-md">
                <h3>
                  {user.uid === item.senderId
                    ? item.receiverName
                    : item.senderName}
                </h3>
              </div>
            </div>
            <div className=" flex items-center gap-x-2">
              {location.pathname == "/" && (
                <button
                  onClick={() => {
                    navigate("/message");
                  }}
                  className=" bg-[#4A81D3] text-white px-4 py-2 rounded-md font-fontRegular"
                >
                  Message
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
