import React from 'react';
import './HomeButton.scss'

interface IHomeButtonProps{
    name: string
}

function HomeButton(props: IHomeButtonProps) {
    return (
        <div className='home-button'>
            <span className='home-button-text'>{props.name}</span>
        </div>
    );
}

export default HomeButton;