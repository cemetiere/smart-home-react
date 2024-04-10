import React from 'react';
import './modal.css'

interface ModalProps{
    active: boolean,
    setActive: (val:boolean)=>void,
    children: React.ReactNode
}

function Modal(props: ModalProps) {
    return (
        <div className={props.active ? "modal active":"modal"} onClick={()=>props.setActive(false)}>
            <div className="modal__content" onClick={e=>e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;