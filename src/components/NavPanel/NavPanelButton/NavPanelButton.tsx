import React, {useState} from 'react';
import './NavPanelButton.scss'

interface NavPanelButtonProps{
    title: string
    selected: boolean
    onClick: ()=>void
}
function NavPanelButton(props: NavPanelButtonProps) {
    return (
        <div className={props.selected?'navPanelButtonSelected':'navPanelButton'} onClick={()=>props.onClick()}><span className={'navPanelButtonText'}>{props.title}</span></div>
    );


}



export default NavPanelButton;