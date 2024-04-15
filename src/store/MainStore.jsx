import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./ExerciseStore";

const store = configureStore({ reducer: { exerciseReducer } });

export default store;
