import React from "react";
import LoadingIcon from "../Icons/LoadingIcon";

export const Loading = () => {
  return (
    <div role="status">
      <LoadingIcon />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
