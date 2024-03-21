import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as MainLogo } from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error: unknown) {
      throw new Error("You're still signed in")
    }
  };
  return (
    <nav className="flex justify-around bg-cyan-600">
      <Link to="/" className="flex items-center text-white text-xl font-bold">
        SocialNET
        <MainLogo />
      </Link>
      <ul className="flex items-center justify-around w-1/3 text-white">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <button
            onClick={() => navigate("/login")}
            className="bg-white px-12 py-3 font-bold rounded-md text-cyan-600 mr-2"
          >
            Login
          </button>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="bg-white w-36 py-3 font-bold rounded-md text-cyan-600"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};
