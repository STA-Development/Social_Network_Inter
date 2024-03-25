import { combineReducers } from "redux";
import { profileSlice } from "./slices/profile";
import { postsSlice } from "./slices/posts";
import { userSlice } from "./slices/user";

const rootReducer = combineReducers({
  profile: profileSlice.reducer,
  posts: postsSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
