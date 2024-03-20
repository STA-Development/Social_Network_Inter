import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { profileSelector } from "../redux/slices/profile";
import { IIndividualPost, IPosts } from "../Interfaces/postsTypes";
import { IPostsProps } from "../types/reduxTypes/postsStateTypes";

export const IndividualPost = ({ post }: IPostsProps) => {
  const navigate = useNavigate();
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const profile = useAppSelector(profileSelector.profile);

  const handleImageClick = () => {
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const handleEditPost = () => {
    return <div></div>;
  };

  return (
    <div className="mt-2 w-1/3 border-2 h-[580px] border-b-neutral-100 rounded-xl p-2 mb-3">
      <div className="flex justify-between pb-2">
        <div className="flex items-center">
          <img
            src={profile.avatarUrl}
            className="w-[40px] h-[40px] rounded-full cursor-pointer"
            alt="Avatar"
            onClick={handleAvatarClick}
          />
          <p className="pl-2">
            {profile.name} {profile.surname}
          </p>
        </div>
        <div className="flex items-center mt-1">
          <Link
            to="#"
            className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            // onClick={handleEditPost}
          >
            Edit
          </Link>
        </div>
      </div>
      <p>{post.postText}</p>
      <div className="flex flex-col h-full items-center">
        <img
          src={post.imageUrl}
          className=" h-96 w-full cursor-pointer"
          onClick={handleImageClick}
        />
        <input
          type="text"
          placeholder="Write a comment..."
          className="bg-gray-100 rounded-2xl p-2 w-full mt-4"
        />
      </div>

      {showFullScreen && (
        <div
          className={`${
            showFullScreen ? "backdrop-blur-sm bg-[rgba(0,0,0,0.1)]" : null
          } active fixed top-0 left-0 right-0 bottom-0 flex z-[1000] justify-center items-center`}
          onClick={handleCloseFullScreen}
        >
          <div className="w-2/3 h-2/3">
            <img src={post.imageUrl} className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};
