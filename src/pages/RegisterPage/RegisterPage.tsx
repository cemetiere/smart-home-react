import React, {Dispatch, SetStateAction, useState} from 'react';
import './RegisterPage.scss'
import woman from './images/image-1.png'
import flower from './images/image-2.png'
import {useAppDispatch} from "../../store/hooks";
import {setUser} from "../../store/userSlice";
import { userInfo, userRegisterInfo } from '../../types/types';

interface registerPageProps{
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

function RegisterPage(props: registerPageProps) {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    let user: userRegisterInfo = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber
    }

    // TODO fetch
    const register = () => {
        let response: userInfo = {
            userID: 1,
            username: user.username,
            token: 'meow'
        }
        dispatch(setUser(response))
    }

    return (
        <div className="inner">
            <img src={woman} alt="" className="image-1"/>
            <form className={'registerForm'}>
                <h3>New Account?</h3>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Username" value={username}
                           onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="First name" value={firstName}
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Last name" value={lastName}
                           onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Email" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Phone number" value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="password" className="form-control" placeholder="Password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>

                <button className={'registerButton'} onClick={()=>register()}>
                    <span>Register</span>
                </button>
                <span className={'text'}>Or <span className={'link'}
                                                  onClick={() => props.setIsLogin(true)}>sign in</span> if you have an account</span>
            </form>
            <img src={flower} alt="" className="image-2"/>


        </div>
    );
}

export default RegisterPage;