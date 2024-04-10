import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface userInfo{
    username: string | null,
    token: string | null
}
const initialState: userInfo = {
    username: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userInfo>) =>{
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer