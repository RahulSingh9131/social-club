import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookmark:[],
}

export const bookmarkSlice=createSlice({
    name:"bookmark",
    initialState,
    reducers:{
        savePost:(state,action)=>{
            state.bookmark=[...state.bookmark,action.payload];
        },
        removePost:(state,action)=>{
            const updatedList=state.bookmark.filter((item)=>item._id!==action.payload);
            state.bookmark=updatedList;
        }
    }
})
export const {savePost,removePost}=bookmarkSlice.actions;

export default bookmarkSlice.reducer;