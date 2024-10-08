import { formatDistance } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { EmojiIcon } from "../../svg/Smile";
import { GalleryIcon } from "../../svg/Gallery";
// import DemoImg from "../../assets/demo-img.jpg";
import { useSelector } from "react-redux";
import avatarImg from "../../assets/avatar.jpg";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as Ref,
  uploadBytesResumable,
} from "firebase/storage";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [emojiShow, setEmojiShow] = useState(false);
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const storage = getStorage();
  const chosenFile = useRef(null);
  const scrollRef = useRef(null);

  const handleSendMessage = () => {
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceivedName: singleFriend.name,
        whoReceivedId: singleFriend.id,
        message: message,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
      });
      setMessage("");
      setEmojiShow(false);
    }
  };

  // get Message
  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      let singleMessageArray = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whoSendId &&
            item.val().whoReceivedId === singleFriend.id) ||
          (user.uid === item.val().whoReceivedId &&
            item.val().whoSendId === singleFriend.id)
        ) {
          singleMessageArray.push(item.val());
        }
      });
      setAllMessage(singleMessageArray);
    });
  }, [singleFriend?.id]);

  const handleEmoji = ({ emoji }) => {
    setMessage(message + emoji);
  };

  const handleImageUpload = (e) => {
    // console.log(e.target.files[0]);
    const imgFile = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = sendImageMessage/ ${imgFile}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceivedName: singleFriend.name,
            whoReceivedId: singleFriend.id,
            message: message,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
          });
          setMessage("");
          setEmojiShow(false);
        });
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  const handleSendButton = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className=" w-full bg-white">
        <div className=" py-4 px-6 bg-[#212121] rounded-s-md rounded-r-md">
          <div className=" flex items-center gap-x-2">
            <div className=" w-10 h-10 rounded-full bg-orange-200 overflow-hidden">
              <img
                src={singleFriend.profile || avatarImg}
                alt=""
                className=" w-full h-full object-cover"
              />
            </div>
            <div>
              <span className=" font-fontRegular text-white">
                {singleFriend.name || "Please select your friend for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div className=" h-[430px] bg-[#fbfbfbfb] px-6 overflow-y-auto">
          {singleFriend?.status === "single"
            ? allMessage.map((item, i) => (
                <div key={i} ref={scrollRef}>
                  {item.whoSendId === user.uid ? (
                    <div className=" w-[70%] py-4 ml-auto flex flex-col items-end">
                      {item.image ? (
                        <div className=" w-[70%] py-4 ml-auto overflow-hidden">
                          <img
                            src={item.image}
                            alt="bird"
                            className=" w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <>
                          <p className=" bg-slate-600 p-5 text-white rounded-md inline-block">
                            {item.message}
                          </p>
                          <span className=" mt-2 text-sm text-slate-500">
                            {/* {console.log(item.date)}
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                          includeSeconds: true,
                        })} */}
                          </span>
                        </>
                      )}
                    </div>
                  ) : item.image ? (
                    <div className=" w-[70%] py-4 mr-auto flex flex-col items-start">
                      <div className=" w-[70%] py-4 ml-auto overflow-hidden">
                        <img
                          src={item.image}
                          alt="bird"
                          className=" w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className=" w-[70%] py-4 mr-auto flex flex-col items-start">
                      <p className=" bg-slate-900 p-5 text-white rounded-md inline-block">
                        {item.message}
                      </p>
                      <span className=" mt-2 text-sm text-slate-500">
                        {/* {formatDistance(item.date, new Date(), {
                        addSuffix: true,
                      })} */}
                        {/* {console.log(item.date)} */}
                        date
                      </span>
                    </div>
                  )}
                </div>
              ))
            : ""}
          {/* sender message */}
          {/* <div className=" w-[70%] py-4 ml-auto">
            <p className=" bg-slate-600 p-5 text-white rounded-md inline-block">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus qui ex sit. Reiciendis ipsum ullam iste? Corrupti ab
              cumque porro repellat magni enim beatae quibusdam, ut facilis
              architecto, cum rem perferendis sapiente, doloribus possimus.
              Pariatur, facilis voluptatum. Delectus aperiam aspernatur sit
              ipsam ex. Repellat facere mollitia architecto consectetur nobis,
              perferendis, quam nemo culpa vero fugiat nam corporis accusamus
              laudantium asperiores aspernatur amet modi, ab accusantium
              repudiandae pariatur eligendi? Quis debitis earum magni natus in
              sint rem quod repellat reprehenderit voluptatum odit distinctio
              excepturi, dolore sequi temporibus? Ipsa, labore. Sequi illum
              quisquam eligendi, odit magni voluptate commodi labore nam at
              rerum?
            </p>
          </div> */}
          {/* receiver message */}
          {/* <div className=" w-[70%] py-4 mr-auto">
            <p className=" bg-slate-900 p-5 text-white rounded-md inline-block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              veritatis necessitatibus, inventore aperiam atque corporis aut
              corrupti hic ratione doloremque fuga assumenda. Minus beatae
              fugiat ex provident suscipit debitis doloremque doloribus aperiam
              aut? Eius, explicabo repellat? Quasi nostrum necessitatibus modi
              error? Quae beatae temporibus architecto necessitatibus vel? Vero
              aliquam quam earum, totam similique consequatur in qui iusto
              voluptates eum. Aliquam rerum enim pariatur incidunt velit
              repellendus explicabo hic molestiae! Dolorum sequi vitae animi aut
              quod aperiam quis, reiciendis, repudiandae consequuntur nostrum
              numquam quaerat omnis ea itaque, unde odio assumenda. Explicabo
              minima inventore sed quia facere dignissimos ipsam, aliquam quam
              incidunt?
            </p>
          </div> */}

          {/* media */}
          {/* <div className=" w-[70%] py-4 ml-auto overflow-hidden">
            <img
              src={DemoImg}
              alt="bird"
              className=" w-full h-full object-cover rounded-md"
            />
          </div> */}
          {/* media */}
          {/* <div className=" w-[70%] py-4 mr-auto overflow-hidden">
            <img
              src={DemoImg}
              alt="bird"
              className=" w-full h-full object-cover rounded-md"
            />
          </div> */}
        </div>
        <div className=" bg-[#f5f5f5] py-4">
          <div className=" bg-white w-[532px] mx-auto rounded-md py-3 flex items-center justify-center gap-x-5">
            <div className=" flex items-center gap-x-2 w-[15%]">
              <div className=" relative">
                <div
                  onClick={() => setEmojiShow((prev) => !prev)}
                  className=" cursor-pointer"
                >
                  <EmojiIcon />
                </div>
                {emojiShow && (
                  <div className=" absolute bottom-10 -left-2">
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                )}
              </div>
              <div
                className=" cursor-pointer"
                onClick={() => chosenFile.current.click()}
              >
                <GalleryIcon />
              </div>
              <input
                ref={chosenFile}
                hidden
                type="file"
                onChange={handleImageUpload}
              />
            </div>
            <input
              type="text"
              placeholder="type something"
              className=" w-[60%] p-1 outline-none"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyUp={handleSendButton}
            />
            <div className=" w-[15%]">
              <button
                className=" bg-[#4A81D3] px-4 py-2 rounded-md font-fontRegular text-sm text-white"
                onClick={handleSendMessage}
              >
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
