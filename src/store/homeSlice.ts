import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {homesInfo} from "../types/types";


const initialState = {
    homes: [
        {
            home: {
                id: 0,
                name: "B6",
                category: "small"
            },
            sensors: [
                {
                    id: 0,
                    name: "Temp",
                    typeSensor: "temperature",
                    value: "16"
                },
                {
                    id: 1,
                    name: "Light",
                    typeSensor: "temperature",
                    value: "16"
                },
                {
                    id: 0,
                    name: "Temp",
                    typeSensor: "temperature",
                    value: "16"
                },


            ]
        },
        {
            home: {
                id: 1,
                name: "Moscow",
                category: "big"
            },
            sensors: [
                {
                    id: 0,
                    name: "Light",
                    typeSensor: "temperature",
                    value: "16"
                }
            ]
        }
    ]
}


export const homeSlice = createSlice({
    name: 'homes',
    initialState,
    reducers: {
        setHomes: (state, action: PayloadAction<homesInfo>) =>{
            state.homes = action.payload.homes
        }
    }
})

export const {setHomes} = homeSlice.actions
export default homeSlice.reducer