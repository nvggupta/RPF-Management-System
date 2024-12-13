import { configureStore } from "@reduxjs/toolkit";
// import rpfSlice from "src/Components/Features/RPFslice.jsx";
import rpfSlice  from "../Features/RPFslice";
const store = configureStore({
  reducer: {
    rpf: rpfSlice,
  },
});

export default store;