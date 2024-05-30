import React, {useState} from 'react';
import './NavPanel.scss'
import logo from '../../icons/logo.png'
import NavPanelButton from "./NavPanelButton/NavPanelButton";
import LoginItem from "../LoginItem/LoginItem";
import {useNavigate} from "react-router-dom";

interface navPanelProps{
    links: string[],
    titles: string[],
}
function NavPanel(props: navPanelProps) {
    const [selected, setSelected] = useState(new Array(props.links.length).fill(false))
    const nav = useNavigate();

    function goWelcome(){
        setSelected(new Array(selected.length).fill(false))
        nav("/")
    }
    function select(i: number){
        let modified = new Array(props.links.length).fill(false);
        modified[i] = true;
        setSelected(modified)
        switch (i) {
            case 0:
                nav(props.links[0])
                break;
            case 1:
                nav(props.links[1])
                break;
            case 2:
                nav(props.links[2])
                break;
        }

    }
    return (
        <div className={'navPanel'}>
            <div className={'logoWrapper'}>
                <img src={logo} alt={"logo"} className={'logo'} onClick={()=>goWelcome()}/>
            </div>
            {props.links.map((link, i) => {
                return <NavPanelButton title={props.titles[i]} selected={selected[i]} onClick={()=>select(i)}/>
            })}
            <LoginItem/>
        </div>
    );
}

export default NavPanel;