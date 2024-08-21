import React from "react";
import { CrossIcon } from "../../svg/Cross";
import { Cropper } from "react-cropper";

const ImageCropper = ({ setImage, image, cropperRef, getCropData }) => {
  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-screen flex justify-center items-center">
        <div className=" w-[30%] bg-white rounded-md p-4 relative">
          <div className="">
            <h3 className=" font-fontRegular text-base text-black text-center">
              Upload Photo
            </h3>
            <div
              className=" w-6 top-1 right-1 absolute cursor-pointer hover:fill-red-600 "
              onClick={() => setImage()}
            >
              <CrossIcon />
            </div>
          </div>
          <div className=" w-20 h-20 rounded-full mx-auto overflow-hidden">
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div>
          <div className=" mt-5">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
          <button
            className=" bg-[#6cd0fb] w-full text-white font-fontBold py-2 rounded-md mt-3"
            onClick={getCropData}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
