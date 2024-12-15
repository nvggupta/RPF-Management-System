import { createSlice, current } from "@reduxjs/toolkit";
import SelectCategory from "../Admin/SelectCategory";

const initialState = {
  rpf: {
    vendors : [],
    category : [],
    SelectedCategory : ""
  },
};

export const rpfSlice = createSlice({
    name: "rpf",
    initialState,
    reducers: {
        setVendors: (state, action) => {
            state.rpf.vendors = action.payload;
        },
        setCategory: (state, action) => {
            console.log(action.payload);
            state.rpf.category = action.payload;
            console.log(current(state));
        },
        categorySelectByAdmin : (state , action)=>{
            state.rpf.setCategory = action.payload;
        },
        

    }
});
export const { setVendors, setCategory } = rpfSlice.actions;
export default rpfSlice.reducer;