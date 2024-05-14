import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./ExerciseStore";
import chatReducer from "./ChatStore";

const store = configureStore({
  reducer: { exerciseReducer: exerciseReducer, chatReducer: chatReducer },
});

export default store;
