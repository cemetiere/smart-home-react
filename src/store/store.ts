import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./userSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        home: homeReducer
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch