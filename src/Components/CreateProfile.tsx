import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { profileMiddleware } from "../redux/slices/profile";
import { useNavigate } from "react-router-dom";
import storage from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import firebase from "../firebase";
import app from "../firebase";

export const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const storage = getStorage(app, "gs://post-project-80c0a.appspot.com");

  const handleSubmit = (e: any) => {
    console.log(name, surname, email);
    e.preventDefault();
    dispatch(
      profileMiddleware.sendProfileData({ name, surname, email }, () => {
        dispatch(profileMiddleware.shouldRedirectToCreateProfile(false));
        navigate("/profile");
      }),
    );
  };

  return (
    <div className="flex justify-center pt-4">
      <div className="bg-gray-200 w-1/3 p-2">
        <div className="flex justify-center m-3">
          <div className="text-2xl">Create Profile</div>
        </div>
        <div>
          <form className="flex flex-col">
            <label>Name</label>
            <input
              className="p-2 m-2 rounded"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <label>Surname</label>
            <input
              className="p-2 m-2 mb-2 rounded"
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
            ></input>
            <label>Email</label>
            <input
              className="p-2 m-2 mb-2 rounded"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 my-4"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
