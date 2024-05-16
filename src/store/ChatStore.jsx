import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatId: null,
  usersDetailsArray: [],
  // isChatClicked: false,
};

const chatSlice = createSlice({
  name: "exerciseInfo",
  initialState: initialState,
  reducers: {
    setChatId(state, action) {
      state.selectedChatId = action.payload;
    },
    setUserDetails(state, action) {
      state.usersDetailsArray = [...state.usersDetailsArray, action.payload];
    },
    // isChatClicked(state, action) {
    //   state.isChatClicked = action.payload;
    //   console.log(state.isChatClicked);
    // },
  },
});

export const chatAction = chatSlice.actions;

const chatReducer = chatSlice.reducer;

export default chatReducer;

// currently not in use
// selector and dispatch functions are commented
