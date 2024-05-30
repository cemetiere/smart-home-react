import React, {useEffect, useState} from 'react';
import './HomePanel.scss'
import AddButton from '../AddButton/AddButton';
import HomeButton from '../HomeButton/HomeButton';
import {useAppSelector} from "../../store/hooks";
import {homesInfo} from "../../types/types";
import {useNavigate} from "react-router-dom";
import Modal from "../../modals/Modal/Modal";
import AddHomePanel from "../AddHomePanel/AddHomePanel";

function HomePanel() {
    const homes: homesInfo = useAppSelector(state => state.homes);
    const nav = useNavigate();
    const [active, setActive] = useState(false)
    function showSensors(homeID: string, homeName: string){
        nav("/sensors", {state: {homeID: homeID, homeName: homeName}})
    }
    return (
        <div className='home-panel'>
            <div className='homes-header'>Your Homes</div>
            <div className='homes-body'>
                {homes?.homes?.map(home => {
                    return <HomeButton deletable={true} homeId={home.home_id} name={home.name} onClick={()=>showSensors(home.home_id, home.name)}/>
                })}
                <AddButton onClick={()=>setActive(true)}/>
            </div>
            <Modal active={active} setActive={setActive}>
                <AddHomePanel setActive={setActive}/>
            </Modal>
        </div>
    );
}

export default HomePanel;