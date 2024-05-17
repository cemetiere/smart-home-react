import React, {Dispatch, SetStateAction, useState} from 'react';
import woman from "../registerPage/images/image-1.png";
import flower from "../registerPage/images/image-2.png";
import { useAppDispatch } from '../../store/hooks';
import { userInfo, userLoginInfo } from '../../types/types';
import { setUser } from '../../store/userSlice';

interface loginPageProps{
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

function LoginPage(props: loginPageProps) {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const user: userLoginInfo = {
        username: username,
        password: password
    }
    const send = () => {
        const response: userInfo = {
            username: user.username,
            token: "meow"
        }
        dispatch(setUser(response))
    } 
    return (
        <div className="inner">
            <img src={woman} alt="" className="image-1"/>
            <form action="" className={'registerForm'}>
                <h3>Sign in</h3>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-lock"></span>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className={'registerButton'} onClick={send}>
                    <span>Login</span>
                </button>
                <span className={'text'}>Or <span className={'link'}
                                                  onClick={() => props.setIsLogin(false)}>register</span> if you are new here</span>
            </form>
            <img src={flower} alt="" className="image-2"/>


        </div>
    );
}

export default LoginPage;