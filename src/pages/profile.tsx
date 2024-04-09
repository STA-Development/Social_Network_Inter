import React, { useEffect, useRef, useState } from "react";
import { dispatch, useAppSelector } from "../redux/hooks";
import { profileMiddleware, profileSelector } from "../redux/slices/profile";
import { Loading } from "../Components/Loading";
import EditIcon from "../Icons/EditIcon";
import DefaultAvatarIcon from "../Icons/DefaultAvatarIcon";
import AvatarEditIcon from "../Icons/AvatarEditicon";
import useImageUpload from "../hooks/useImageUpload";
import { getBase64 } from "../utils/getBase64";

export const Profile = () => {
  const [isUploadButtonVisible, setIsUploadButtonVisible] =
    useState<boolean>(true);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const isAvatarUploadLoading = useAppSelector(
    profileSelector.isProfileImageLoading,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [previewImage, setPreviewImage] = useState<string | null | any>(null);
  const { selectedImage, setSelectedImage, uploadImage } = useImageUpload();

  const profile = useAppSelector(profileSelector.profile);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget?.files?.[0]) {
      setSelectedImage(event.currentTarget?.files?.[0]);
      getBase64(event.currentTarget?.files?.[0]).then((r) =>
        setPreviewImage(r),
      );
      setIsEditVisible(true);
    }
  };

  const handleAvatarInputClick = () => {
    inputRef?.current?.click();
  };
  const handleImageSave = () => {
    if (!selectedImage) return;
    uploadImage(selectedImage, "avatars").then((url) => {
      dispatch(profileMiddleware.updateUserAvatar(url));
      dispatch(profileMiddleware.getProfile());
      setSelectedImage(null);
      setPreviewImage(null);
      setIsEditVisible(false);
    });
  };

  useEffect(() => {
    setIsUploadButtonVisible(false);
  }, [isUploadButtonVisible]);

  return (
    <>
      <div className="flex flex-col h-[100vh] items-center bg-[#f0f8ff] ">
        <div className="relative h-2/4 w-full border-b-2 border-gray-300">
          <img
            alt="coverImage"
            src="https://media.licdn.com/dms/image/C4D12AQHMPBvE3avWzg/article-inline_image-shrink_1000_1488/0/1616872522462?e=1717632000&v=beta&t=B2RDXKlD9iDknbjTNXv2r4ntyX3093bqwYqEzjN_Z9E"
            className="relative w-full h-full"
          />
          <div className="absolute text-center -bottom-20 left-0 right-0">
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
            <div className="flex justify-center">
              {isEditVisible ? (
                <div className="flex mb-2">
                  <button
                    onClick={handleAvatarInputClick}
                    className="flex p-2.5 rounded-xl hover:rounded-3xl transition-all duration-300 text-gray-600"
                  >
                    <EditIcon />
                  </button>
                  <div>
                    <button
                      onClick={handleImageSave}
                      className="mt-2 text-white bg-slate-500 hover:bg-slate-700 font-semibold py-2 px-4  hover:border-transparent rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-center">
              <input
                id="uploadAvatarInput"
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <label
                htmlFor="uploadAvatarInput"
                className="flex flex-col items-center gap-2 cursor-pointer"
              ></label>

              <div className="relative rounded-full flex w-[10rem] h-[10rem]  ring-2 ring-gray-300">
                {!previewImage && !profile?.avatarUrl ? (
                  <div className="relative w-full h-full overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                    <DefaultAvatarIcon />
                  </div>
                ) : isAvatarUploadLoading ? (
                  <div className="w-full flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <img
                    alt="avatar"
                    src={previewImage ?? profile?.avatarUrl}
                    className=" w-full h-full rounded-full"
                  />
                )}
                {!isEditVisible ? (
                  <div className="relative rounded-full bg-gray-300">
                    <button
                      onClick={handleAvatarInputClick}
                      className="absolute right-[-10px] bottom-0 flex p-2.5 rounded-xl hover:rounded-3xl transition-all duration-300 text-gray-800"
                    >
                      <AvatarEditIcon />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-20 z-[1000]">
          <p className="text-4xl font-bold">
            {profile?.name} {profile?.surname}
          </p>
          <p>{profile?.email} </p>
        </div>
      </div>
    </>
  );
};
