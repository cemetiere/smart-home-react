import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {homesInfo, ISensorFullInfo, ISensorValue} from "../types/types";


const initialState = {
    homes: [
        {
            home_id: "0",
            name: "Moscow",
            category: "big",
            sensors: [
                {
                    id: "0",
                    name: "string",
                    event_type: "string",
                    monitoring: {
                        id: "string",
                        received_at: "string",
                        value: 2,
                    }
                }
            ],
            devices: [
                {
                    id: "123",
                    name: "Alisa",
                    event_type: "temperature"
                }
            ]
        }
    ]
}


export const homeSlice = createSlice({
    name: 'homes',
    initialState,
    reducers: {
        setHomes: (state, action: PayloadAction<homesInfo>) => {
            state.homes = action.payload.homes
        },
        setSensorValue: (state, action: PayloadAction<ISensorFullInfo>) => {
            if(action.payload.index){
                state.homes[state.homes.findIndex((home=>home.home_id==action.payload.homeId))].sensors[action.payload.index].monitoring.value = action.payload.value;
            }
        }
    }
})

export const {setHomes, setSensorValue} = homeSlice.actions
export default homeSlice.reducer