import React, {useState} from 'react';
import './AddHomePanel.scss'
import AddButton from "../AddButton/AddButton";
import {SERVER_URL} from "../../constants/constans";
import {setHomes} from "../../store/homeSlice";
import {homesInfo, userInfo} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getHomes} from "../../thunk/getHomes";

interface AddHomePanelProps{
    setActive:  React.Dispatch<React.SetStateAction<boolean>>
}
function AddHomePanel(props: AddHomePanelProps) {
    const user: userInfo = useAppSelector((state) => state.user);
    const homes: homesInfo = useAppSelector(state => state.homes);
    const [name, setName] = useState("")
    const [type, setType] = useState("medium")
    const dispatch = useAppDispatch();
    function sendData(){
        fetch(`${SERVER_URL}/home`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                category: type,
                user_id: user.userID
            })
        })
            .then(response => response.json())
            .then((home)=>{
                getHomes(user)
                    .then(homes=>{
                        dispatch(setHomes(homes))
                        alert("success")
                        props.setActive(false)
                    })
                    .catch(error=>console.log(error))
            })
            .catch(error=>{
                console.log(error.message)
            })
    }
    return (
        <div className={'modal-panel'}>
            <div className={'modal-title'}>Add new home</div>
            <div className={'input-wrapper'}>
                <p className={"input-labels"}>Name</p>
                <input value={name} onChange={event=>setName(event.target.value)} className={"input-field"} type={"text"} placeholder={"Home name"}/>
            </div>
            <div className={'input-wrapper'}>
                <p className={"input-labels"}>Type</p>
                <select className={"input-field"} value={type} onChange={e=>setType(e.target.value)}>
                    <option value={"small"}>Small</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"big"}>Big</option>
                </select>
            </div>
            <div className={"add-home-button"} onClick={sendData}>Add</div>

        </div>
    );
}

export default AddHomePanel;