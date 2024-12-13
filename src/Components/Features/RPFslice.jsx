import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  rpf: [],
};

export const rpfSlice = createSlice({
    name: "rpf",
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.rpf = action.payload; 
            console.log(action.payload);
        },
        removeUser : (state) => {
            state.rpf = [];
        }
    }
});
export const { setUser , removeUser } = rpfSlice.actions;
export default rpfSlice.reducer;