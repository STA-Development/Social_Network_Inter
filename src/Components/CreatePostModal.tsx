import React, { useEffect, useState } from "react";
import { read } from "fs";
import { dispatch, useAppSelector } from "../redux/hooks";
import { postsMiddleware } from "../redux/slices/posts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { profileMiddleware, profileSelector } from "../redux/slices/profile";
import { IndividualPost } from "./IndividualPost";

export const CreatePostModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  // const previewImage = (event: any) => {
  //   let input = event.target;
  //   if (input.files && input.files[0]) {
  //     setPostImage(URL.createObjectURL(input.files[0]));
  //   }
  // };
  const profileId = useAppSelector(profileSelector.profileId);

  const handlePostImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedPostImage = event.currentTarget?.files?.[0];
    if (!selectedPostImage) return;

    const imageRef = ref(storage, `/images/${selectedPostImage.name}`);
    uploadBytes(imageRef, selectedPostImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        // dispatch(profileMiddleware.updateProfileImage(url));
      });
    });
  };

  const onModalSubmit = () => {
    dispatch(
      postsMiddleware.createPost(
        { title, postText, imageUrl, profileId },
        profileId,
        1,
      ),
    );
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="backdrop-blur-md bg-[rgba(0,0,0,0.2)] flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none opacity-1 visibility-visible">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Create Post</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Title
                    </label>
                    <input
                      aria-required
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                      }
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Post text
                    </label>
                    <textarea
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setPostText(e.target.value)
                      }
                      aria-required
                      className=" shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="What's on your mind?"
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Image
                    </label>
                    <input
                      aria-required
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="file"
                      accept="image/*"
                      name="image"
                      id="file"
                      onChange={handlePostImageUpload}
                    />
                    {showModal ? (
                      <div className="flex justify-center">
                        <img
                          id="preview"
                          alt="Preview Image"
                          src={imageUrl}
                          className="w-48 h-48"
                        />
                      </div>
                    ) : null}
                  </form>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={onModalSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
