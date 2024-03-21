import React, { useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      navigate("/login");
    } catch (error: unknown) {
      throw new Error("Sign up failed")
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      navigate("/login");
    } catch (error: unknown) {
      throw new Error("Sign up failed")
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-6">
      <div className="flex flex-col w-[400px] p-4 rounded shadow-lg">
        <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
        <button
          className="px-4 py-3 mb-4 mx-3 border flex justify-center gap-2 border-slate-200 rounded-lg text-white bg-blue-500 hover:border-slate-400 hover:text-slate-100 hover:shadow transition duration-150"
          onClick={handleGoogleSignUp}
        >
          <img
            className="w-6 h-6 bg-white rounded p-1"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Sign Up with Google</span>
        </button>
        <div>
          <form>
            <div className="flex flex-col justify-around">
              <input
                type="text"
                placeholder="Name"
                className="p-2 m-2 rounded border-inherit border-2"
              />
              <input
                type="text"
                placeholder="Surname"
                className="p-2 m-2 rounded border-inherit border-2"
              />
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

              <div className="flex justify-center mt-2">
                <p>
                  Already have an account?
                  <Link className="text-blue-600" to="/login">
                    Login
                  </Link>
                </p>
              </div>
              <button
                className="px-4 py-3 mt-12 mx-12 mb-2 mx-2 border flex justify-center gap-2 bg-green-600 border-slate-200 rounded-lg text-white hover:border-slate-400 hover:text-slate-100 hover:shadow transition duration-150"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
