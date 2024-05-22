import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        homes: homeReducer
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch