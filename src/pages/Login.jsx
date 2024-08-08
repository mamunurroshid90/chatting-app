import React from "react";
import { toast, ToastContainer } from "react-toastify";
import LoginForm from "../components/LoginForm";
import Lottie from "lottie-react";
import registrationAnimation from "../annimation/regAnnimation.json";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className=" w-full h-screen flex justify-center items-center">
        <div className=" w-1/2 flex items-center justify-between bg-white shadow-lg rounded-sm gap-x-2 p-4">
          <div className=" w-[48%]">
            <Lottie animationData={registrationAnimation} loop={true} />
          </div>
          <div className=" w-[48%]">
            <LoginForm toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
