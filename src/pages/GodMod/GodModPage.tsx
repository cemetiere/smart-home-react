import React, {useState} from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {HISTORY_CHART_OPTIONS} from "../SensorsPage/HistoryChart";
import Slider from "../../components/Slider/Slider";
import {GENERATOR_URL, SERVER_URL} from "../../constants/constans";
import {useAppSelector} from "../../store/hooks";
import './GodModPage.scss'

function GodModePage() {
    const [value, setValue] = useState(0)
    const homes = useAppSelector(state => state.homes);
    const [homeId, setHomeId] = useState("0")
    function setWeather(){
        if(homeId=="0"){
            alert("Choose sensor at first");
            return
        }
        console.log(typeof value)
        fetch(`${GENERATOR_URL}/weather/${homeId}/${value}`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .catch(error=>{
                console.log(error)
            })
    }
    return (
        <div className='page'>
            <div className={'modal-panel'}>
                <div className={'modal-title'}>Set temperature</div>
                <div className={'input-wrapper'}>
                    <p className={"input-labels"}>Home</p>
                    <select className={"input-field"} value={homeId}
                            onChange={e => setHomeId(e.target.value)}>
                        <option value={0}>None</option>
                        {homes.homes.map(home => <option value={home.home_id}>{home.name}</option>)}
                    </select>
                </div>
                <Slider value={value} min={-100} max={100} className={`god-mod-slider`}
                        onChange={(e) => setValue(+e.target.value)}
                        onMouseUp={setWeather}/>
            </div>
        </div>
    );
}

export default GodModePage;