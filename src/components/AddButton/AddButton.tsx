import React from 'react';
import './AddButton.scss'

interface AddButtonProps{
    className?: string,
    onClick?: ()=>void
}
function AddButton(props: AddButtonProps) {
    return (
        <div className={`add-button ${props.className}`} onClick={props.onClick} >
            <span className='add-plus-sign'>+</span>
        </div>
    );
}

export default AddButton;