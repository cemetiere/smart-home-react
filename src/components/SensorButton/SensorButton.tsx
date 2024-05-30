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
    sensorId: string,
    index?: number,
    id: string
}
function SensorButton(props: SensorsButtonsProps) {
    const user: userInfo = useAppSelector((state) => state.user)
    const [currentValue, setCurrentValue] = useState(props.value)
    const [settingActive, setSettingActive] = useState(false)
    const [deviceValue, setDeviceValue] = useState(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(props.type==="sensor") setInterval(updateSensor, 10000)

    }, []);

    function updateSensor(){
        if(props.sensorId){
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

    }

    useEffect(() => {
        getDeviceState()
    }, []);
    function getDeviceState(){
        if(props.sensorId){
            fetch(`${SERVER_URL}/home/${props.homeId}/deviceSettings/${props.sensorId}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((response)=>{
                    // console.log(response)
                    setDeviceValue(response.value)
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }
    function setDeviceState(){
        fetch(`${SERVER_URL}/home/${props.homeId}/setDeviceState`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                device_id: props.sensorId,
                event_type: props.event_type,
                action_type: "set",
                action_value: deviceValue
            })
        })
            .then((response)=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            })
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

    function getSensor(){
        switch (props.event_type) {
            case "temperature":
                return (
                    <>
                        <img src={temperature} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name.slice(0,10)}</div>
                        <div className={"temperature-value"}>{currentValue ? `${Math.ceil(currentValue)}°C` :
                            <img src={require('../../icons/loading.gif')} alt={"loading"} className={"loading-icon"}/>}
                        </div>
                    </>
                )
            case "light":
                return (
                    <>
                        <img src={light} alt={"light"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name.slice(0,10)}</div>
                        <div className={"temperature-value"}>{currentValue ? `${Math.ceil(currentValue)}%` :
                            <img src={require('../../icons/loading.gif')} alt={"loading"} className={"loading-icon"}/>}
                        </div>
                    </>
                )
            case "door":
                return (
                    <>
                        <img src={props.value == 1 ? openLock : lock} alt={"lock"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name.slice(0,10)}</div>
                        <div className={"temperature-value"}>{currentValue==1?'Opened':'Closed'}</div>
                    </>
                )
        }
    }
    function getDevice() {
        switch (props.event_type) {
            case "temperature":
                return (
                    <>
                        <img src={fire} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{Math.ceil(deviceValue)}°C</div>
                        <Slider value={deviceValue} min={10} max={80} className={`device-slider ${settingActive?'active':""}`} onChange={(e)=>setDeviceValue(+e.target.value)}
                            onMouseUp={setDeviceState}/>
                    </>
                )
            case "light":
                return (
                    <>
                        <img src={light} alt={"temp"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{Math.ceil(deviceValue)}%</div>
w
                    </>
                )
            case "door":
                return (
                    <>
                        <img src={door} alt={"lock"} className={"sensor-icon"}/>
                        <div className={"sensor-name"}>{props.name}</div>
                        <div className={"temperature-value"}>{deviceValue==1?'Opened':'Closed'}</div>
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
            <div className={'sensor-button'} onClick={ ()=> {
                if(props.onClick)props.onClick();
                setSettingActive(false)
            }
            } onMouseLeave={()=>setSettingActive(false)}>
                {getDevice()}
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