import React from 'react';
import './HomeButton.scss'

interface IHomeButtonProps{
    name: string,
    onClick: ()=>void,
    className?: string
}

function HomeButton(props: IHomeButtonProps) {
    return (
        <div className={`home-button ${props.className}`} onClick={props.onClick}>
            <span className={`home-button-text`}>{props.name}</span>
        </div>
    );
}

export default HomeButton;