import { createSlice } from "@reduxjs/toolkit";

const initialState={
    postId:"",
    isModalOpen:false,
}


export const postSlice= createSlice({
    name:"post",
    initialState,
    reducers:{
        setPostId:(state,action)=>{
            state.postId=action.payload;
        },
        setIsModalOpen:(state,action)=>{
            state.isModalOpen=action.payload;
        },
    }
})
export const {setPostId,setIsModalOpen}=postSlice.actions;

export default postSlice.reducer;