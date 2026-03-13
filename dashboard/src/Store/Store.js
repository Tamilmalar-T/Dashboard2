// // src/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../Store/authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";      // adjust paths
import bookingReducer from "./bookingSlice"; // <-- add

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer, // <-- make sure this key matches your selector
  },
});

export default store;
