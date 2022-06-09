import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import bookmarkReducer from "../features/bookmarkSlice";

export const store= configureStore({
    reducer:{
        post:postReducer,
        bookmark:bookmarkReducer,
    }
})