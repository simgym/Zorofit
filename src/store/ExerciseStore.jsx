import { createSlice } from "@reduxjs/toolkit";
import defaultAvatar from "../assets/1.jpg";

const initialState = {
  type: "",
  userSelectedExerciseList: [],
};

const exerciseSlice = createSlice({
  name: "exerciseInfo",
  initialState: initialState,
  reducers: {
    exerciseType(state, action) {
      state.type = action.payload;
    },
    userSelectedExercises(state, action) {
      state.userSelectedExerciseList = [
        ...state.userSelectedExerciseList,
        action.payload,
      ];
    },
  },
});

export const exerciseAction = exerciseSlice.actions;

const exerciseReducer = exerciseSlice.reducer;

export default exerciseReducer;
