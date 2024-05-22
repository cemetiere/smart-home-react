import React, {useState} from 'react';
import './LoginItem.scss'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Modal from "../../modals/Modal/Modal";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import {setUser} from "../../store/userSlice";
import {userInfo} from "../../types/types";


function LoginItem() {
    const user = useAppSelector((state) => state.user)
    const [active, setActive] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useAppDispatch()

    const logOut = () => {
        let nullUser: userInfo = {
            userID: 0,
            username: null,
            token: null
        }
        dispatch(setUser(nullUser))
    }

    return user.username?(
        <div className={'loginItem'}>
            <div className='man'></div>
            <span className='loginText'><span className={'usernameText'}>{user.username}</span></span>
            <button className={'loginButton'} onClick={logOut}>Log out</button>
        </div>
    ):
        <div className={'loginItem'}>
            <span className='loginText'>
                Sign in
            </span>
            <button className={'loginButton'} onClick={()=>setActive(true)}>
                    Authorize
            </button>
            <Modal active={active} setActive={setActive}>
                {isLogin?<LoginPage setIsLogin = {setIsLogin}/>:<RegisterPage setIsLogin = {setIsLogin}/>}
            </Modal>
        </div>;
}

export default LoginItem