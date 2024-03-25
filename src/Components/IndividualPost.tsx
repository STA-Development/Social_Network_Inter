import { useState } from "react";
import { Link } from "react-router-dom";

export const IndividualPost = () => {
  let imageUrl = "https://tecdn.b-cdn.net/img/new/avatars/2.webp";
  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleImageClick = () => {
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const handleEditPost = () => {
    return <div></div>;
  };

  return (
    <div className="mt-2 w-1/4 border-2 h-[580px] border-b-neutral-100 rounded-xl p-2 mb-3">
      <div className="flex justify-between pb-2">
        <div className="flex items-center">
          <img
            src={imageUrl}
            className="w-12 rounded-full border-2"
            alt="Avatar"
          />
          <p className="pl-2">Name Surname</p>
        </div>
        <div className="flex items-center mt-1">
          <Link
            to="#"
            className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            onClick={handleEditPost}
          >
            Edit
          </Link>
        </div>
      </div>
      <p>Here is my picture...</p>
      <div className="flex flex-col h-full items-center">
        <img
          src={imageUrl}
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
          } w-full h-full active fixed top-0 left-0 flex z-[1000] justify-center items-center`}
          onClick={handleCloseFullScreen}
        >
          <img src={imageUrl} className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};
