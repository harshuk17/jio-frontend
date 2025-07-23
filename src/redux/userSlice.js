import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedIn:false,
    user:null
};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userLoggedInDetails:(state,action)=>{
            state.isLoggedIn=true;
            state.user = action.payload;
        },
        userLogOutDetails:(state)=>{
            state.isLoggedIn=false;
            state.user=null;
        }
    }
});

export const {userLoggedInDetails,userLogOutDetails}=userSlice.actions;
export default userSlice.reducer;