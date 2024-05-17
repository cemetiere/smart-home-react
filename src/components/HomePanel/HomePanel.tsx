import React from 'react';
import './HomePanel.scss'
import AddHomeButton from '../AddHomeButton/AddHomeButton';
import HomeButton from '../HomeButton/HomeButton';

function HomePanel() {

    return (
        <div className='home-panel'>
            <div className='homes-header'>Your Homes</div>
            <div className='homes-body'>
                <HomeButton name='B6'/>
                <HomeButton name='Zaprunya'/>
                <HomeButton name='Pskov'/>
                <HomeButton name='Dmitrov'/>
                <AddHomeButton/>
            </div>
        </div>
    );
}

export default HomePanel;