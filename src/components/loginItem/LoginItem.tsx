import React, {useState} from 'react';
import './LoginItem.scss'
import {useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import {useAppSelector} from "../../store/hooks";
import Modal from "../Modal/Modal";
import woman from "../../pages/registerPage/images/image-1.png";
import flower from "../../pages/registerPage/images/image-2.png";
import RegisterPage from "../../pages/registerPage/RegisterPage";

function LoginItem() {
    const user = useAppSelector((state) => state.user.name)
    const [active, setActive] = useState(false)
    return user?(
        <div className={'loginItem'}>

        </div>
    ):
        <div className={'loginItem'}>
            Login or create new account:
            <button className={'loginButton'} onClick={()=>setActive(true)}>
                Authorize
            </button>
            <Modal active={active} setActive={setActive}>
                <RegisterPage/>
            </Modal>
        </div>;
}

export default LoginItem