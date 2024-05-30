import React from 'react';
import './HomeButton.scss'
import cross from '../../icons/cross.png'
import {homeInfo, userInfo} from "../../types/types";
import {SERVER_URL} from "../../constants/constans";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getHomes} from "../../thunk/getHomes";
import {setHomes} from "../../store/homeSlice";
interface IHomeButtonProps{
    name: string,
    onClick: ()=>void,
    className?: string,
    homeId: string,
    deletable: boolean
}

function HomeButton(props: IHomeButtonProps) {
    const user: userInfo = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    function onDelete(){
        fetch(`${SERVER_URL}/home/${props.homeId}`, {
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
    return (
        <div className={`home-button ${props.className}`} onClick={(e)=>{
            e.stopPropagation()
            e.preventDefault()
            props.onClick();
        }}>
            {props.deletable ?
                <img src={cross} className={'delete-home-button'} onClick={(e) => {
                e.stopPropagation()
                onDelete()
            }}/>:""}

            <span className={`home-button-text`}>{props.name}</span>
        </div>
    );
}

export default HomeButton;