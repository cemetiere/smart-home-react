import React, { useState } from 'react';
import './Slider.scss';

interface SliderProps{
    value: number;
    min: number;
    max: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onMouseUp?: React.MouseEventHandler<HTMLInputElement>
}

function Slider(props: SliderProps) {/*w    ww    . d   e  m o 2  s   .  c o   m */

    return (
        <div className="slider-container">
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
                onMouseUp={props.onMouseUp}
                className="slider"
            />
            <p className={"slider-text"}>Slider Value: {props.value}</p>
        </div>
    );
}

export default Slider;