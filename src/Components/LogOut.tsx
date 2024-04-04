import { useNavigate } from "react-router-dom";
import React from "react";
import { dispatch } from "../redux/hooks";
import {userMiddleware} from "../redux/slices/user";

export const LogOut = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(userMiddleware.userSignOut())
    navigate("/login");

  };
  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg  px-4 py-2 text-center ml-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => handleSignOut()}
      >
        Log Out
      </button>
    </div>
  );
};
