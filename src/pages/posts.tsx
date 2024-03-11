import { CreatePostModal } from "../Components/CreatePostModal";
import { useState } from "react";
import { IndividualPost } from "../Components/IndividualPost";
import { IIndividualPost } from "../Interfaces/postsTypes";

export const Posts = () => {
  //TODO: Change posts with posts  coming from backend and type
  const posts: IIndividualPost[] = [];
  const [showModal, setShowModal] = useState(false);
  const handleCreatePost = () => {
    setShowModal(true);
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <CreatePostModal showModal={showModal} setShowModal={setShowModal} />
      For a new post press below.
      <button
        data-target="authentication-modal"
        data-toggle="modal"
        className="w-1/4 block mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleCreatePost}
      >
        Create post
      </button>
      <IndividualPost />
    </div>
  );
};
