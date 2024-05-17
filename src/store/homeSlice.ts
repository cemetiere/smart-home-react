import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { userInfo } from "../types/types";


const initialState: userInfo = {
    username: null,
    token: null
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHomes: (state, action: PayloadAction<userInfo>) =>{
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }
})

export const {setHomes} = homeSlice.actions
export default homeSlice.reducer