import React, {useState} from 'react';
import './NavPanel.scss'
import logo from '../../logo.png'
import NavPanelButton from "./navPanelButton/NavPanelButton";
import LoginItem from "../loginItem/LoginItem";
import Modal from "../Modal/Modal";

interface navPanelProps{
    links: string[],
    titles: string[],
    selected: boolean[],
    setSelected:  React.Dispatch<React.SetStateAction<any[]>>
}
function NavPanel(props: navPanelProps) {
    const selected = props.selected;
    const setSelected = props.setSelected

    function goWelcome(){
        setSelected(new Array(selected.length).fill(false))
    }
    function select(i: number){

        let modified = selected.slice()
        modified.forEach((el,j)=>{
            modified[j] = i === j;
        })
        setSelected(modified)
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