import React from "react";
import { EmojiIcon } from "../../svg/Smile";
import { GalleryIcon } from "../../svg/Gallery";
import DemoImg from "../../assets/demo-img.jpg";
import { useSelector } from "react-redux";
import avatarImg from "../../assets/avatar.jpg";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
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
          {/* sender message */}
          <div className=" w-[70%] py-4 ml-auto">
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
          </div>
          {/* receiver message */}
          <div className=" w-[70%] py-4 mr-auto">
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
          </div>

          {/* media */}
          <div className=" w-[70%] py-4 ml-auto overflow-hidden">
            <img
              src={DemoImg}
              alt="bird"
              className=" w-full h-full object-cover rounded-md"
            />
          </div>
          {/* media */}
          <div className=" w-[70%] py-4 mr-auto overflow-hidden">
            <img
              src={DemoImg}
              alt="bird"
              className=" w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
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
