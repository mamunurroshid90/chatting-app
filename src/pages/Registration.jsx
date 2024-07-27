import React from "react";
import FormReg from "../components/FormReg";
import Lottie from "lottie-react";
import registrationAnimation from "../annimation/regAnnimation.json";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  return (
    <>
      <ToastContainer />
      <div className=" w-full h-screen flex justify-center items-center">
        <div className=" w-1/2 flex items-center justify-between bg-white shadow-lg rounded-sm gap-x-2 p-4">
          <div className=" w-[48%]">
            <Lottie animationData={registrationAnimation} loop={true} />;
          </div>
          <div className=" w-[48%]">
            <FormReg toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
