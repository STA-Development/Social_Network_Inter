import React, { useCallback, useEffect, useState } from "react";
import { dispatch, useAppSelector } from "../redux/hooks";
import { profileMiddleware, profileSelector } from "../redux/slices/profile";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { Loading } from "../Components/Loading";

export const Profile = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [isUploadButtonVisible, setIsUploadButtonVisible] =
    useState<boolean>(true);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const isAvatarUploadLoading = useAppSelector(
    profileSelector.isProfileImageLoading,
  );

  const shouldRedirectToCreateProfile = useAppSelector(
    profileSelector.shouldRedirectToCreateProfile,
  );
  const profile = useAppSelector(profileSelector.profile);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.currentTarget?.files?.[0];
    if (!selectedImage) return;

    const imageRef = ref(storage, `/avatars/${selectedImage.name}`);
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAvatarUrl(url);
        dispatch(profileMiddleware.updateProfileImage(url));

        setIsEditVisible(true);
      });
    });
  };

  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedCoverImage = event.currentTarget?.files?.[0];
    if (!selectedCoverImage) return;

    const imageRef = ref(storage, `/avatars/${selectedCoverImage.name}`);
    uploadBytes(imageRef, selectedCoverImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCoverImageUrl(url);
        // dispatch(profileMiddleware.updateProfileImage(url));

        // setIsEditVisible(true);
      });
    });
  };

  const handleAvatarInputClick = () => {
    const input = document.getElementById("uploadAvatarInput");
    input?.click();
  };
  const handleCoverImageInputClick = () => {
    const input = document.getElementById("uploadCoverImageInput");
    input?.click();
  };
  const handleImageSave = () => {
    dispatch(profileMiddleware.updateUserAvatar(avatarUrl));
    setIsEditVisible(false);
  };

  useEffect(() => {
    setIsUploadButtonVisible(false);
  }, [isUploadButtonVisible]);

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
    <>
      <div className="flex flex-col mt-4 h-[100vh] items-center bg-[#f0f8ff]">
        <div className="relative h-2/4 w-9/12 border-2 border-gray-900 mt-2 rounded-xl">
          <img
            alt="cover Photo"
            src={coverImageUrl}
            className="relative w-full h-full rounded-lg"
          />
          <div
            onClick={handleCoverImageInputClick}
            className=" cursor-pointer absolute flex justify-center items-center bg-neutral-200 w-48 h-9 right-8 bottom-2 z-10 rounded"
          >
            <input
              id="uploadCoverImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageUpload}
            />
            <label
              htmlFor="upload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            ></label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M1 8a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 8.07 3h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 16.07 6H17a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Zm13.5 3a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM10 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>

            <div className="text-black">Edit cover photo</div>
          </div>
          <div className="absolute text-center -bottom-20 left-20">
            {isUploadButtonVisible ? (
              <div className="mb-2">
                <button
                  type="submit"
                  id="uploadButton"
                  onClick={handleAvatarInputClick}
                  className="px-3 py-2 border-2 border-gray-400 rounded-2xl hover:bg-gray-400"
                >
                  Upload Avatar
                </button>
              </div>
            ) : null}
            <div>
              {isEditVisible ? (
                <div className="flex">
                  <button
                    onClick={handleAvatarInputClick}
                    className="flex p-2.5 rounded-xl hover:rounded-3xl transition-all duration-300 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <div>
                    <button
                      onClick={handleImageSave}
                      className="mt-2  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center rounded-full mb-1 mt-2 border-gray-300 bg-gray-50 shadow-md">
              <input
                id="uploadAvatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <label
                htmlFor="upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              ></label>

              <div className="relative rounded-full flex w-[10rem] h-[10rem]  ring-2 ring-gray-300">
                {!profile.avatarUrl ? (
                  <div className="relative w-full h-full overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                    <svg
                      className="absolute w-full h-full text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <img
                    alt="avatar"
                    src={profile.avatarUrl}
                    className=" w-full h-full rounded-full"
                  />
                )}
                {!isEditVisible ? (
                  <div className="relative rounded-full bg-gray-300">
                    <button
                      onClick={handleAvatarInputClick}
                      className="absolute right-[-12px] bottom-0 flex p-2.5 rounded-xl hover:rounded-3xl transition-all duration-300 text-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-8 w-8 bg-gray-200 hover:bg-gray-300 rounded-full p-[2px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/*<div className="w-10/12 h-[0.20rem] bg-neutral-700 mb-2"></div>*/}

        <div className="text-center mt-2">
          <p className="text-4xl font-bold">
            {profile.name} {profile.surname}
          </p>
          <p>{profile.email}</p>
        </div>
      </div>
    </>
  );
};
