import {userInfo} from "../types/types";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {SERVER_URL} from "../constants/constans";
import {setHomes} from "../store/homeSlice";

export function getHomes(user: userInfo){
    return fetch(`${SERVER_URL}/home/all/${user.userID}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(error=>{
            console.log(error.message)
        })
}