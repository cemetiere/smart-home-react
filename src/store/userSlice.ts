import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        name: null,
        token: null
    },
    reducers: {

    }
})

export default userSlice.reducer