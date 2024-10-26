import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ref:null
}

const rendererSlice = createSlice({
    name:"renderer",
    initialState,
    reducers:{
        updateRenderer:(state,action) => {
            state.ref = action.payload
        }
    }
})

export const {updateRenderer} = rendererSlice.actions
export default rendererSlice.reducer