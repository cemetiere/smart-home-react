import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { userInfo } from "../types/types";


const initialState: userInfo = {
    userID: 0,
    username: "1",
    token: "null"
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userInfo>) =>{
            state.userID = action.payload.userID
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer