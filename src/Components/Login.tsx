import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // @ts-ignore
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const accessToken = await auth.currentUser?.getIdToken();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      navigate("/profile");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      const token = localStorage.getItem("accessToken");
      navigate("/profile");
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-6">
      <div className="flex flex-col w-[400px] p-4 rounded shadow-lg">
        <h1 className="mb-8 text-3xl text-center">Sign In to your account</h1>
        <button
          className="px-4 py-3 mb-4 mx-3 border flex justify-center gap-2 border-slate-200 rounded-lg text-white bg-blue-500 hover:border-slate-400 hover:text-slate-100 hover:shadow transition duration-150"
          onClick={handleGoogleSignIn}
        >
          <img
            className="w-6 h-6 bg-white rounded p-1"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Sign In with Google</span>
        </button>
        <form>
          <div className="flex flex-col justify-around h-full">
            <input
              type="email"
              placeholder="Email"
              className="p-2 m-2 rounded border-inherit border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 m-2 rounded border-inherit border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="px-4 py-3 mt-4 my-4 mx-2 border flex justify-center gap-2 bg-blue-500 border-slate-200 rounded-lg text-white hover:border-slate-400 hover:text-slate-100 hover:shadow transition duration-150"
              onClick={handleSignIn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
