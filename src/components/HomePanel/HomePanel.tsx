import React from 'react';
import './HomePanel.scss'
import AddButton from '../AddButton/AddButton';
import HomeButton from '../HomeButton/HomeButton';
import {useAppSelector} from "../../store/hooks";
import {homesInfo} from "../../types/types";
import {useNavigate} from "react-router-dom";

function HomePanel() {
    const homes: homesInfo = useAppSelector(state => state.homes);
    const nav = useNavigate();
    function showSensors(homeID: number, homeName: string){
        nav("/sensors", {state: {homeID: homeID, homeName: homeName}})
    }
    return (
        <div className='home-panel'>
            <div className='homes-header'>Your Homes</div>
            <div className='homes-body'>
                {homes.homes.map(home => {
                    return <HomeButton name={home.home.name} onClick={()=>showSensors(home.home.id, home.home.name)}/>
                })}
                <AddButton/>
            </div>
        </div>
    );
}

export default HomePanel;