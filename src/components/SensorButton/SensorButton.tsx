import React, {useEffect, useState} from 'react';
import './SensorButton.scss'
import temperature from '../../icons/temperature.png'
import fire from '../../icons/firewood.png'
import light from '../../icons/light.png'
import door from '../../icons/door2.png'
import lock from '../../icons/lock.png'
import openLock from '../../icons/open-lock.png'
import cross from "../../icons/cross.png";
import gear from "../../icons/gear.png"
import {SERVER_URL} from "../../constants/constans";
import {getHomes} from "../../thunk/getHomes";
import {setHomes, setSensorValue} from "../../store/homeSlice";
import {ISensorValue, userInfo} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Slider from "../Slider/Slider";

interface SensorsButtonsProps{
    value?: any,
    type: "device" | "sensor",
    name: string,
    onClick?: ()=>void,
    event_type: string,
    homeId: string,
    sensorId: string | undefined,
    index?: number
}
function SensorButton(props: SensorsButtonsProps) {
    const user: userInfo = useAppSelector((state) => state.user)
    const [currentValue, setCurrentValue] = useState(props.value)
    const [value, setValue]  = useState(20)
    const [settingActive, setSettingActive] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setInterval(updateSensor, 10000)
    }, []);

    function updateSensor(){
        fetch(`${SERVER_URL}/home/${props.homeId}/sensorMonitoring/${props.sensorId}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((value: ISensorValue)=>{
                setCurrentValue(value.value)
                dispatch(setSensorValue({...value, sensorId: props.sensorId, homeId: props.homeId, index: props.index}))
            })
            .catch(error=>{
                console.log(error)
            })
    }

    function getSensor(){
        switch (props.event_type) {
            case "temperature":
                return (
                    <>
                        <img src={temperature} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{currentValue ? `${currentValue}°C` :
                            <img src={require('../../icons/loading.gif')} alt={"loading"} className={"loading-icon"}/>}
                        </div>
                    </>
                )
            case "light":
                return (
                    <>
                        <img src={light} alt={"light"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{currentValue ? `${currentValue}%` :
                            <img src={require('../../icons/loading.gif')} alt={"loading"} className={"loading-icon"}/>}
                        </div>
                    </>
                )
            case "door":
                return (
                    <>
                        <img src={props.value == 1 ? openLock : lock} alt={"lock"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{currentValue==1?'Opened':'Closed'}</div>
                    </>
                )
        }
    }
    function deleteSensor(){
        fetch(`${SERVER_URL}/home/${props.homeId}/deleteSensor/${props.sensorId}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                getHomes(user)
                    .then(homes=>{
                        dispatch(setHomes(homes))
                    })
                    .catch(error=>console.log(error))

            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    function deleteDevice(){
        fetch(`${SERVER_URL}/home/${props.homeId}/deleteDevice/${props.sensorId}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                getHomes(user)
                    .then(homes=>{
                        dispatch(setHomes(homes))
                    })
                    .catch(error=>console.log(error))

            })
            .catch(error=>{
                console.log(error.message)
            })
    }

    function getDevice() {
        switch (props.event_type) {
            case "temperature":
                return (
                    <>
                        <img src={fire} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                    </>
                )
            case "light":
                return (
                    <>
                        <img src={light} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                    </>
                )
            case "door":
                return (
                    <>
                        <img src={door} alt={"lock"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>

                    </>
                )
        }
    }
    return props.type === "sensor" ?
    (
        <div className={'sensor-button'} onClick={props.onClick}>
            {getSensor()}
            <img src={cross} className={'delete-home-button'} onClick={(e) => {
                e.stopPropagation()
                deleteSensor()
            }}/>
        </div>
    ): (
            <div className={'sensor-button'} onClick={props.onClick} onMouseLeave={()=>setSettingActive(false)}>
                {getDevice()}
                <Slider value={value} min={10} max={80} text={"Value:"} className={`device-slider ${settingActive?'active':""}`} onChange={(e)=>setValue(+e.target.value)}/>
                <img src={gear} className={'setting-device-button'} onClick={(e) => {
                    setSettingActive(!settingActive)
                    e.stopPropagation()

                }}/>
                <img src={cross} className={'delete-home-button'} onClick={(e) => {
                    e.stopPropagation()
                    deleteDevice()
                }}/>
            </div>
        )
}

export default SensorButton;