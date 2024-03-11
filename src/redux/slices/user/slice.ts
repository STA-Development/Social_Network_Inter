import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "./initialState";
import reducers from "../user/reducers";

const slice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers,
});

export default slice;
