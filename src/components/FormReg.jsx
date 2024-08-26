import { useFormik } from "formik";
import React, { useState } from "react";
import { signUp } from "../validation/validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const FormReg = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUser();
    },
    validationSchema: signUp,
  });

  const createNewUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        console.log(user);
        updateProfile(auth.currentUser, {
          displayName: formik.values.fullName,
        })
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.success("Email sent for verification", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              setLoading(false);
            });
          })
          .then(() => {
            set(ref(db, "users/" + user.uid), {
              username: user.displayName,
              email: user.email,
            });
          })
          .catch((error) => {
            toast.error(error.message, {
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
          });
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("this email already in use", {
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
          Register your new journey
        </h2>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            className=" border border-slate-300 p-2 rounded-sm outline-none"
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className=" text-sm font-fontRegular text-red-500">
              {formik.errors.fullName}
            </p>
          )}
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
            disabled={loading}
            className=" bg-slate-900 text-white text-center font-fontBold rounded-sm py-2"
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Sign up"}
          </button>
        </form>
        <p className=" text-sm mt-3 text-center text-blue-500">
          Already have an account?{" "}
          <Link to="/login" className=" text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default FormReg;
