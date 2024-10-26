import { configureStore } from "@reduxjs/toolkit";
import renderer from "./rendererSlice"

const store = configureStore({
    reducer:{renderer}
})

export default store