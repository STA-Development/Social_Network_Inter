import React, { useState } from "react";
import { dispatch, useAppSelector } from "../redux/hooks";
import { postsMiddleware } from "../redux/slices/posts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { profileSelector } from "../redux/slices/profile";
import { useForm } from "react-hook-form";
import { IPostFormData } from "../Interfaces/postsTypes";

export const CreatePost = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IPostFormData>();
  const [previewImage, setPreviewImage] = useState<string | null | any>(null);
  const [selectedPostImage, setSelectedPostImage] = useState<null | File>(null);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(true);

  const profile = useAppSelector(profileSelector.profile);

  const handlePostImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.currentTarget?.files?.[0]) {
      setSelectedPostImage(event.currentTarget?.files?.[0]);
      getBase64(event.currentTarget?.files?.[0]).then((r) =>
        setPreviewImage(r),
      );
    }
  };
  const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleClose = () => {
    setShowModal(false);
    clearErrors();
  };

  const onModalSubmit = handleSubmit((data: IPostFormData) => {
    if (profile) {
      const profileId = profile.id;
      if (!selectedPostImage) return;
      const imageRef = ref(storage, `/images/${selectedPostImage.name}`);
      uploadBytes(imageRef, selectedPostImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((imageUrl) => {
          dispatch(
            postsMiddleware.createPost({ ...data, imageUrl, profileId }, 1),
          );
        });
      });
      setPreviewImage(null);
      setShowModal(false);
      reset();
    }
  });

  return (
    <>
      {showModal ? (
        <>
          <div className="backdrop-blur-sm bg-[rgba(0,0,0,0.2)] flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none opacity-1 visibility-visible">
            <div className="relative my-6 mx-auto w-[470px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Create Post</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={handleClose}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={onModalSubmit}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                  >
                    <input
                      {...register("title", {
                        required: "This field is required",
                      })}
                      placeholder="Title"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black mb-2"
                    />
                    {showErrorMessage ? (
                      <p className="text-red-600">{errors.title?.message}</p>
                    ) : null}
                    <textarea
                      {...register("postText", {
                        required: "This field is required",
                      })}
                      className=" shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="What's on your mind?"
                    />
                    {showErrorMessage ? (
                      <p className="text-red-600">{errors.postText?.message}</p>
                    ) : null}
                    <input
                      {...register("previewImage", {
                        required: "Image is required",
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="file"
                      accept="image/*"
                      name="image"
                      id="file"
                      onChange={handlePostImageUpload}
                    />
                    {showErrorMessage ? (
                      <p className="text-red-600">
                        {errors.previewImage?.message?.toString()}
                      </p>
                    ) : null}
                    {showModal ? (
                      <div className="flex justify-center">
                        <img
                          id="preview"
                          alt="Preview"
                          src={previewImage}
                          className="w-48 h-48"
                        />
                      </div>
                    ) : null}
                    <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
