import { useFormik } from "formik";
import React, { useState } from "react";
import { signIn } from "../validation/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../feature/slice/loginSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: signIn,
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        if (user.emailVerified === true) {
          dispatch(loggedInUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Please verified your email", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("Email or Password incorrect", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoading(false);
        }
      });
  };
  return (
    <>
      <div className="">
        <h2 className=" font-fontBold text-center mb-3 text-xl">
          Login your new journey
        </h2>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className=" border border-slate-300 p-2 rounded-sm outline-none"
          />
          {formik.errors.email && formik.touched.email && (
            <p className=" text-sm font-fontRegular text-red-500">
              {formik.errors.email}
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className=" border border-slate-300 p-2 rounded-sm outline-none"
          />
          {formik.errors.password && formik.touched.password && (
            <p className=" text-sm font-fontRegular text-red-500">
              {formik.errors.password}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className=" bg-slate-900 text-white text-center font-fontBold rounded-sm py-2"
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Sign in"}
          </button>
        </form>
        <p className=" text-sm mt-3 text-center text-blue-500">
          I don't have an account?{" "}
          <Link to="/registration" className=" text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
