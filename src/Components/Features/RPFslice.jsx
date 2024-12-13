import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rpf: [],
};

const rpfSlice = createSlice({
    name: "rpf",
    initialState,
    reducers: {
        setRpf: (state, action) => {
            state.rpf = action.payload;
        },
    },
});
export const { setRpf } = rpfSlice.actions;
export default rpfSlice.reducer;