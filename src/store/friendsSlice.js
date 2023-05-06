import { createSlice } from "@reduxjs/toolkit";



const friendsSlice = createSlice({
    name:'friends',
    initialState:{
        friends:[],
    },
    reducers:{
        followUser(state,action){
        state.friends.push(action.payload)
        }
    },
    extraReducers:{

    }
})


export const { } = friendsSlice.actions;

export default friendsSlice;