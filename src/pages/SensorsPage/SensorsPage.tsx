import React, {LegacyRef, RefObject, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
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
import {IDevice, ISensor, userInfo} from "../../types/types";
import {getHomes} from "../../thunk/getHomes";
import {setHomes} from "../../store/homeSlice";

interface IHistory {
    history:{
        value: number[],
        received_at: string[]
    }
}
interface SensorsProps{
    homeID?: number,
    homeName?: string
}
function SensorsPage(props: SensorsProps) {
    const {state} = useLocation();
    const {homeID, homeName} = state;
    const [active, setActive] = useState(false)
    const [activeAddModal, setActiveAddModal] = useState(false)
    const [activeAddModal2, setActiveAddModal2] = useState(false)
    const homes = useAppSelector(state => state.homes);
    const home = homes.homes.find(home=> home.home_id === homeID);
    const nav = useNavigate();
    const [interval, setInterval] = useState(100)
    const [currentSensor, setCurrentSensor] = useState<ISensor|IDevice>();
    const [deviceSensors, setDeviceSensors] = useState<ISensor>()
    const chart: any = useRef();
    const user: userInfo = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [sensorToDeviceID, setSensorToDeviceID] = useState("")
    const [name, setName] = useState("")
    const [eventType, setEventType] = useState("temperature")
    const [unitsType, setUnitsType] = useState("celsius")
    const [deviceModal, setDeviceModal] = useState(false)
    useEffect(()=>{
        changeInterval(interval)
    }, [currentSensor])
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
                    data: history.history.value.map(Number).reverse(),
                });
                currentChart.update({xAxis: {categories: history.history.received_at.reverse()}})
            })
            .catch(error=>{
                console.log(error.message)
                const currentChart = chart.current.chart;
                currentChart.series[0].update({
                    data: [value*Math.random(),value*Math.random(),value*Math.random()].map(Number)
                });
                currentChart.update({xAxis: ["2","4","6"]})
            })
    }
    function addSensor() {
        fetch(`${SERVER_URL}/home/${homeID}/addSensor`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                event_type: eventType,
                units_type: unitsType
            })
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
    function addDevice() {
        fetch(`${SERVER_URL}/home/${homeID}/addDevice`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                event_type: eventType,
            })
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
    function connectSensorToDevice(){
        if(sensorToDeviceID=="0"){
            alert("Choose sensor at first");
            return
        }
        console.log(JSON.stringify({
            device_id: currentSensor?.id,
            sensor_id: sensorToDeviceID,
        }))
        fetch(`${SERVER_URL}/home/${homeID}/connect`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                device_id: currentSensor?.id,
                sensor_id: sensorToDeviceID,
            })
        })
            .then(response => {
                alert("connected")
                setDeviceModal(false)
            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    function getDeviceSensors(id: string){

        fetch(`${SERVER_URL}/home/${homeID}/getDeviceSensors/${id}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            setDeviceSensors(response.sensor)
        })
        .catch(error=>{
            console.log(error)
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
                    <div className={"header-text"}>{homeName}</div>
                    <div className={"cringe"}></div>
                </div>
                <div className={"sensors-devices"}>
                    <div className={'sensors-body'}>
                        <span style={{marginTop: "10px"}}>Sensors</span>
                        {home?.sensors?.map((sensor: ISensor, i) => <SensorButton key={i*i} index={i} homeId={homeID} sensorId={sensor.id} type={"sensor"} value={sensor?.monitoring?.value}
                                                                                  event_type={sensor.event_type}
                                                                                  name={sensor.name} id={sensor.id} onClick={() => {
                            setCurrentSensor(sensor)
                            setActive(true)
                        }}/>)}
                        <div className={"sensor-add"} onClick={()=>setActiveAddModal(true)}>
                            <div className={'sensor-add-text'}>Add new sensor</div>
                        </div>
                    </div>
                    <div className={"devices-body"}>
                        <span style={{marginTop: "10px"}}>Devices</span>
                        {home?.devices?.map((device: IDevice, i) => <SensorButton key={i*i*i} homeId={homeID} sensorId={device.id}
                                                                                  type={"device"}
                                                                                  event_type={device.event_type}
                                                                                  name={device.name} id={device.id} onClick={()=>{
                              getDeviceSensors(device.id)
                              setCurrentSensor(device);
                              setSensorToDeviceID("0");
                              setDeviceModal(true)
                        }}/>)}
                        <div className={"sensor-add"} onClick={() => setActiveAddModal2(true)}>
                            <div className={'sensor-add-text'}>Add new device</div>
                        </div>
                    </div>

                </div>


            </div>
            <Modal active={deviceModal} setActive={setDeviceModal}>
                <div className={'modal-panel'}>
                    <div className={'modal-title'}>Add sensor to {currentSensor?.name}</div>
                    {deviceSensors?
                        <SensorButton homeId={homeID} sensorId={deviceSensors?.id} type={"sensor"} value={deviceSensors?.monitoring?.value}
                                                 event_type={deviceSensors.event_type}
                                                 name={deviceSensors.name} id={deviceSensors.id} onClick={() => {
                        setActive(true)
                    }}/>: ""}

                    <div className={'input-wrapper'}>
                        <p className={"input-labels"}>Sensor</p>
                        <select className={"input-field"} value={sensorToDeviceID}

                                onChange={e => setSensorToDeviceID(e.target.value)}>
                            <option value={0}>None</option>
                            {home?.sensors.filter((sensor)=>sensor.event_type===currentSensor?.event_type).map(val =>
                                <option value={val.id}>{val.name}</option>)}
                        </select>
                    </div>
                    <div className={"add-home-button"} onClick={connectSensorToDevice}>Connect</div>
                </div>
            </Modal>
            <Modal active={activeAddModal} setActive={setActiveAddModal}>
                <div className={'modal-panel'}>
                    <div className={'modal-title'}>Add new sensor to {homeName}</div>
                    <div className={'input-wrapper'}>
                        <p className={"input-labels"}>Name</p>
                        <input value={name} maxLength={10} onChange={event => setName(event.target.value)} className={"input-field"}
                               type={"text"} placeholder={"Home name"}/>
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
                        <p className={"input-labels"}>Units type</p>
                        <select className={"input-field"} value={unitsType}
                                onChange={e => setUnitsType(e.target.value)}>
                            <option value={"celsius"}>Celsius</option>
                            <option value={"power"}>Power</option>
                            <option value={"binary"}>Binary</option>
                        </select>
                    </div>
                    <div className={"add-home-button"} onClick={addSensor}>Add</div>

                </div>
            </Modal>
            <Modal active={activeAddModal2} setActive={setActiveAddModal2}>
                <div className={'modal-panel'}>
                    <div className={'modal-title'}>Add new device to {homeName}</div>
                    <div className={'input-wrapper'}>
                        <p className={"input-labels"}>Name</p>
                        <input value={name} maxLength={10} onChange={event => setName(event.target.value)} className={"input-field"}
                               type={"text"} placeholder={"Home name"}/>
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
                    <div className={"add-home-button"} onClick={addDevice}>Add</div>
                </div>
            </Modal>
            <Modal active={active} setActive={setActive}>
                <div className={'modal-panel'}>
                    <div className={'modal-title'}>History</div>
                    <div className={'highchart-wrapper'}>
                        <HighchartsReact ref={chart} highcharts={Highcharts} options={HISTORY_CHART_OPTIONS}/>
                    </div>
                    <div className={'slider-wrapper'}>
                        <Slider text={"Interval (minutes)"} value={interval} min={1} max={100}
                                onChange={(e: any) => setInterval(e.target.value)} onMouseUp={(e: any) => {
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