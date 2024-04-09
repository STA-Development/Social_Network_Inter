import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { ReactComponent as MainLogo } from "../logo.svg";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./LogOut";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dispatch, useAppSelector } from "../redux/hooks";
import { userMiddleware, userSelector } from "../redux/slices/user";
import { profileMiddleware, profileSelector } from "../redux/slices/profile";
import HamburgerMenuIcon from "../Icons/HamburgerMenuIcon";

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const isAuthLoading = useAppSelector(userSelector.isAuthLoading);
  const isUserAuthenticated = useAppSelector(userSelector.isUserAuth);
  onAuthStateChanged(auth, (user) => {
    dispatch(userMiddleware.isAuthLoading(true));
    dispatch(userMiddleware.isUserAuth(!!user));
  });
  const shouldRedirectToCreateProfile = useAppSelector(
    profileSelector.shouldRedirectToCreateProfile,
  );
  useEffect(() => {
    if (shouldRedirectToCreateProfile) {
      navigate("/createProfile");
    }
    dispatch(profileMiddleware.shouldRedirectToCreateProfile(false));
  }, [shouldRedirectToCreateProfile]);

  useEffect(() => {
    dispatch(profileMiddleware.getProfile());
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center">
          <MainLogo />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DarkNET
          </span>
        </Link>

        <div className="flex md:order-2">
          {!isAuthLoading ? null : !isUserAuthenticated ? (
            <>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg  px-4 py-2 text-center ml-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg  px-4 py-2 text-center ml-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <LogOut />
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <HamburgerMenuIcon />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/posts"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/feed"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
