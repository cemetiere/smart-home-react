import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import { userInfo } from '../../types/types';
import HomePanel from '../../components/HomePanel/HomePanel';
import '../Page.scss'
import {SERVER_URL} from "../../constants/constans";
import {setHomes} from "../../store/homeSlice";
import {getHomes} from "../../thunk/getHomes";

function HomePage() {
    const user: userInfo = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    useEffect(() => {
        getHomes(user)
            .then(homes=>{
                console.log(homes)
                dispatch(setHomes(homes))
            })
            .catch(error=>console.log(error))
    }, []);

    return user.username? (
        <div className='page'>
            <HomePanel/>
        </div>
    ):
    (
        <div>
            login at first
        </div>
    )
}

export default HomePage;