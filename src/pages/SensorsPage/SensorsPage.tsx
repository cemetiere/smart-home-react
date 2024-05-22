import React, {LegacyRef, RefObject, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/hooks";
import './SensorsPage.scss'
import SensorButton from "../../components/SensorButton/SensorButton";
import AddButton from "../../components/AddButton/AddButton";
import Modal from "../../modals/Modal/Modal";
import Highcharts from "highcharts";
import HighchartsReact, {HighchartsReactRefObject} from "highcharts-react-official";
import {HISTORY_CHART_OPTIONS} from "./HistoryChart";
import InputSlider from "react-input-slider";
import Slider from "../../components/Slider/Slider";
import axios from "axios";
import {SERVER_URL} from "../../constants/constans";
import {ISensor} from "../../types/types";

interface IHistory {
    value: number[],
    received_at: string[]
}
interface SensorsProps{
    homeID?: number,
    homeName?: string
}
function SensorsPage(props: SensorsProps) {
    const {state} = useLocation();
    const {homeID, homeName} = state;
    const [active, setActive] = useState(false)
    const homes = useAppSelector(state => state.homes);
    const home = homes.homes.find(home=> home.home.id === homeID);
    const nav = useNavigate();
    const [interval, setInterval] = useState(100)
    const [currentSensor, setCurrentSensor] = useState<ISensor>()
    const chart: any = useRef();

    const [options, setOptions] = useState(HISTORY_CHART_OPTIONS);
    useEffect(()=>{
        changeInterval(interval)
    },[])
    function changeInterval(value: number){
        fetch(`${SERVER_URL}/home/${homeID}/history/${currentSensor?.id}?interval=${value}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((history: IHistory)=>{
                const currentChart = chart.current.chart;
                currentChart.series[0].update({
                    data: history.value,
                });
                currentChart.update({xAxis: history.received_at})
            })
            .catch(error=>{
                console.log(error.message)
            })
    }

    function navigateHomes(){
        nav("/home")
    }

    return (
        <div className='page'>
            <div className={'sensors-panel'}>
                <div className={'sensors-header'}>
                    <div className={"back-button"} onClick={navigateHomes}>&larr;</div>
                    <div className={"header-text"}>{homeName} sensors</div>
                </div>
                <div className={'sensors-body'}>
                    {home?.sensors.map((sensor: ISensor, i) => <SensorButton value={`${9+i*i}`} type={"temperature"} name={`Thermometer ${i}`} onClick={()=>{
                        setCurrentSensor(sensor)
                        setActive(true)
                    }}/>)}
                    <div className={"sensor-add"}><div className={'sensor-add-text'}>Add new sensor</div></div>
                </div>
            </div>
            <Modal active={active} setActive={setActive}>
                <div className={'modal-panel'}>
                    <div className={'modal-title'}>Temperature history</div>
                    <div className={'highchart-wrapper'}>
                        <HighchartsReact ref={chart} highcharts={Highcharts} options={HISTORY_CHART_OPTIONS}/>
                    </div>
                    <div className={'slider-wrapper'}>
                        <Slider value={interval} min={1} max={36*60} onChange={(e:any)=>setInterval(e.target.value)} onMouseUp={(e:any)=>{
                            setInterval(e.target.value)
                            changeInterval(e.target.value)
                        }}/>
                        {/*<InputSlider  xmin={1} xmax={36*60} axis={'x'} x={interval} onChange={(state)=>setInterval(state.x)}/>*/}
                    </div>
                </div>
            </Modal>
        </div>

    );
}

export default SensorsPage;