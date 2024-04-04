import React from "react";
import { dispatch } from "../redux/hooks";
import { profileMiddleware } from "../redux/slices/profile";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { IProfileFormData } from "../Interfaces/profileTypes";

export const CreateProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileFormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(
      profileMiddleware.sendProfileData({ ...data }, () => {
        dispatch(profileMiddleware.shouldRedirectToCreateProfile(false));
        navigate("/profile");
      }),
    );
  });
  return (
    <div className="flex justify-center pt-4">
      <div className="bg-gray-200 w-1/3 p-2">
        <div className="flex justify-center m-3">
          <div className="text-2xl">Create Profile</div>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={onSubmit}>
            <input
              className="p-2 m-2 rounded"
              {...register("name", {
                required: "*Name is required",
              })}
              placeholder={"Name"}
            />
            <p className="text-red-600">{errors.name?.message}</p>

            <input
              className="p-2 m-2 mb-2 rounded"
              {...register("surname", { required: "*Surname is required" })}
              placeholder={"Surname"}
            />
            <p className="text-red-600">{errors.surname?.message}</p>

            <input
              className="p-2 m-2 mb-2 rounded"
              type="email"
              placeholder={"Email"}
              {...register("email", { required: "*Email is required" })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
            <div className="flex justify-center">
              <button
                type="submit"
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
