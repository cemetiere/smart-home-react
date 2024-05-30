import React, { useState } from 'react';
import './Slider.scss';

interface SliderProps{
    value: number;
    min: number;
    max: number;
    text?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onMouseUp?: React.MouseEventHandler<HTMLInputElement>;
    className?: string
}

function Slider(props: SliderProps) {

    return (
        <div className={props.className??"slider-container"} onClick={(e)=>e.stopPropagation()}>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
                onMouseUp={props.onMouseUp}
                className="slider"
            />
            <p className={"slider-text"}>{props.text}{" "}{props.value}</p>
        </div>
    );
}

export default Slider;