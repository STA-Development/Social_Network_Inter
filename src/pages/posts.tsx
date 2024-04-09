import { CreatePost } from "../Modals/CreatePost";
import { useEffect, useState } from "react";
import { IndividualPost } from "../Components/IndividualPost";
import { IIndividualPost } from "../Interfaces/postsTypes";
import { dispatch, useAppSelector } from "../redux/hooks";
import { postsMiddleware, postsSelector } from "../redux/slices/posts";
import { profileSelector } from "../redux/slices/profile";
import { Loading } from "../Components/Loading";

export const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCreatePost = () => {
    setShowModal(true);
  };
  const posts = useAppSelector(postsSelector.userPosts);
  const profile = useAppSelector(profileSelector.profile);
  const isPostsLoading = useAppSelector(postsSelector.isPostsLoading);
  useEffect(() => {
    if (profile) {
      dispatch(postsMiddleware.getUserPosts(profile.id, 1));
    }
  }, [profile?.id]);

  return (
    <div className="p-5 flex flex-col items-center">
      <CreatePost showModal={showModal} setShowModal={setShowModal} />
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
      {isPostsLoading ? (
        <div className="mt-2">
          <Loading />
        </div>
      ) : posts ? (
        posts.map((post: IIndividualPost) => {
          return <IndividualPost post={post} />;
        })
      ) : null}
    </div>
  );
};
