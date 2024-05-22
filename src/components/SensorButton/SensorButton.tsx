import React from 'react';
import './SensorButton.scss'
import temperature from '../../icons/temperature.png'

interface SensorsButtonsProps{
    value: string,
    type: string,
    name: string,
    onClick?: ()=>void
}
function SensorButton(props: SensorsButtonsProps) {
    function getSensor(type: string){
        switch (type) {
            case "temperature":
                return (
                    <>
                        <img src={temperature} alt={"temp"} className={"temperature-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{`${props.value}°C`}</div>
                    </>
                )

        }
    }

    return (
        <div className={'sensor-button'} onClick={ props.onClick}>
            {getSensor(props.type)}
        </div>
    );
}

export default SensorButton;