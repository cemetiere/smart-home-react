import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { userInfo } from '../../types/types';
import HomePanel from '../../components/HomePanel/HomePanel';
import '../Page.scss'

function HomePage() {
    const user: userInfo = useAppSelector((state) => state.user)

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