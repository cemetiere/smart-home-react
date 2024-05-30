import React, {useEffect, useState} from 'react';
import {IScenario} from "../../types/types";
import './ScenarioItem.scss'
import cross from "../../icons/cross.png";
import {SERVER_URL} from "../../constants/constans";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
interface ScenarioItemProps{
    scenario: IScenario,
    homeId?: string,

}

function ScenarioItem({scenario, homeId}: ScenarioItemProps) {
    let [deleted, setDeleted] = useState(false)
    let [active, setActive] = useState(scenario.is_active)
    useEffect(() => {
        console.log(active)
    }, []);
    function deleteScenario(){
        fetch(`${SERVER_URL}/home/${homeId}/deleteScenario/${scenario.id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setDeleted(true)
            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    function switchScenario(val: boolean){
        fetch(`${SERVER_URL}/home/${homeId}/${scenario.id}/activate`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scenario_id: scenario.id,
                is_active: val,
            })
        })
            .then(response => {
                console.log(scenario)
            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    return deleted?
        <></>:
        <div className={`scenario-item ${active?"active":""}`}>
            <span className={`scenario-name ${active?"active":""}`}>{scenario.name}</span>
            <span
                className={'scenario-info'}>If SENSOR value {scenario.condition_type} {scenario.condition_value} then {scenario.action_type} {scenario.action_value} for DEVICE</span>
            <img src={cross} className={'delete-home-button'} onClick={(e) => {
                e.stopPropagation()
                deleteScenario()
            }}/>

            <div className={`activate-button ${active?"active":""}`} onClick={()=>{
                setActive(!active)
                switchScenario(!active)
            }}>{active ? 'ON' : 'OFF'}</div>
        </div>

}

export default ScenarioItem;