import React, {useEffect, useState} from 'react';
import {homeInfo, homesInfo, IDevice, IScenario, ISensor} from "../../types/types";
import {useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";
import HomeButton from "../../components/HomeButton/HomeButton";
import Modal from "../../modals/Modal/Modal";

import './ScenariosPage.scss'
import {SERVER_URL} from "../../constants/constans";
import ScenarioItem from "../../components/ScenarioItem/ScenarioItem";
import scenarioItem from "../../components/ScenarioItem/ScenarioItem";
import AddButton from "../../components/AddButton/AddButton";
import AddHomePanel from "../../components/AddHomePanel/AddHomePanel";
import {getHomes} from "../../thunk/getHomes";
import {setHomes} from "../../store/homeSlice";
function ScenariosPage() {
    const homes: homesInfo = useAppSelector(state => state.homes);
    const nav = useNavigate();
    const [active, setActive] = useState(false)
    const [addActive, setAddActive] = useState(false)
    const [currentHome, setCurrentHome] = useState<homeInfo>()
    const [scenarios, setScenarios] = useState<IScenario[]>()
    const [name, setName] = useState("")
    const [ifValue, setIfValue] = useState("")
    const [condition, setCondition] = useState("=")
    const [conditionSensorId, setConditionSensorId] = useState("0")
    const [conditionDeviceId, setConditionDeviceId] = useState("0")
    const [eventType, setEventType] = useState("temperature")
    const [actionValue, setActionValue] = useState("")
    const [actionType, setActionType] = useState("set")

    function getScenarios(homeId: string){
        fetch(`${SERVER_URL}/home/${homeId}/scenarios`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                setScenarios(response)
            })
            .catch(error=>{
                console.log(error)
            })
    }
    function addScenario(){
        if(conditionSensorId==="0" || conditionDeviceId==="0"){
            alert("Fill everything please.......")
            return
        }
        fetch(`${SERVER_URL}/home/${currentHome?.home_id}/setting`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sensor_id: conditionSensorId,
                device_id: conditionDeviceId,
                name: name,
                event_type: eventType,
                condition_type: condition,
                condition_value: ifValue,
                action_type: actionType,
                action_value: actionValue
            })
        })
            .then(response => {
                if (currentHome) setTimeout(()=>getScenarios(currentHome.home_id), 2000)
                alert("Success")
                setAddActive(false)
            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    return (
        <div className={"page"}>
            <div className='home-panel'>
                <div className='homes-header'>Your Homes</div>
                <div className='homes-body'>
                    {homes?.homes?.map(home => {
                        return <HomeButton deletable={false} homeId={home.home_id} name={home.name} onClick={()=>{
                            setCurrentHome(home)
                            getScenarios(home.home_id)
                            setActive(true)
                        }}/>
                    })}
                </div>
                <Modal active={active} setActive={setActive}>
                    <div className={'scenarios-panel'}>
                        <div className={'scenarios-header'}>{currentHome?.name} scenarios</div>
                        <div className={'scenarios-body'}>
                            {scenarios?.map(scenario => <ScenarioItem key={scenario.id} homeId={currentHome?.home_id} scenario={scenario}></ScenarioItem>)}
                            <div className={"add-home-button"} onClick={() => setAddActive(true)}>Add scenario!</div>

                        </div>
                    </div>
                    <Modal active={addActive} setActive={setAddActive}>
                        <div className={'modal-panel'}>
                            <div className={'modal-title'}>Add new scenario to {currentHome?.name}</div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Scenario name</p>
                                <input value={name} maxLength={10} onChange={event => setName(event.target.value)}
                                       className={"input-field"}
                                       type={"text"} placeholder={"Scenario name"}/>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Event type</p>
                                <select className={"input-field"} value={eventType}
                                        onChange={e => setEventType(e.target.value)}>
                                    <option value={"temperature"}>Temperature</option>
                                    <option value={"light"}>Light</option>
                                    <option value={"door"}>Door</option>
                                </select>
                            </div>

                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Sensor</p>
                                <select className={"input-field"} value={conditionSensorId}
                                        onChange={e => setConditionSensorId(e.target.value)}>
                                    <option value={"0"}>None</option>
                                    {currentHome?.sensors.filter(sensor => sensor.event_type === eventType).map(sensor =>
                                        <option value={sensor.id}>{sensor.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Condition</p>
                                <select className={"input-field"} value={condition}
                                        onChange={e => setCondition(e.target.value)}>
                                    <option value={"="}>=</option>
                                    <option value={">"}>&gt;</option>
                                    <option value={"<"}>&lt;</option>
                                    <option value={">="}>&ge;</option>
                                    <option value={"<="}>&le;</option>
                                </select>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Sensor condition value</p>
                                <input value={ifValue} maxLength={3}
                                       onChange={event => setIfValue(event.target.value)}
                                       className={"input-field"}
                                       type={"number"} placeholder={"Sensor value"}/>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Device</p>
                                <select className={"input-field"} value={conditionDeviceId}
                                        onChange={e => setConditionDeviceId(e.target.value)}>
                                    <option value={"0"}>None</option>
                                    {currentHome?.devices.filter(device => device.event_type === eventType).map(device =>
                                        <option value={device.id}>{device.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Device value</p>
                                <input value={actionValue}  maxLength={3}
                                       onChange={event => setActionValue(event.target.value)}
                                       className={"input-field"}
                                       type={"number"} placeholder={"Device value"}/>
                            </div>
                            <div className={'input-wrapper'}>
                                <p className={"input-labels"}>Action type</p>
                                <select className={"input-field"} value={actionType}
                                        onChange={e => setActionType(e.target.value)}>
                                    <option value={"set"}>set</option>
                                    <option value={"increase_by"}>increase</option>
                                    <option value={"decrease_by"}>decrease</option>
                                </select>
                            </div>
                            <div className={"add-home-button"} onClick={addScenario}>Add</div>
                        </div>
                    </Modal>
                </Modal>
            </div>
        </div>
    );
}

export default ScenariosPage;