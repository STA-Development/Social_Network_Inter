import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "./initialState";
import reducers from "../posts/reducers";

const slice = createSlice({
  name: "posts",
  initialState: getInitialState(),
  reducers,
});

export default slice;
