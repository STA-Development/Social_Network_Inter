import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "./initialState";
import reducers from "../profile/reducers";

const slice = createSlice({
  name: "profile",
  initialState: getInitialState(),
  reducers,
});

export default slice;
