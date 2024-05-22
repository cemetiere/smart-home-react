import React from 'react';
import './AddButton.scss'

interface AddButtonProps{
    className?: string
}
function AddButton({className}: AddButtonProps) {
    return (
        <div className={`add-button ${className}`} >
            <span className='add-plus-sign'>+</span>
        </div>
    );
}

export default AddButton;