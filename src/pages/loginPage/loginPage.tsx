import React, {Dispatch, SetStateAction} from 'react';
import woman from "../registerPage/images/image-1.png";
import flower from "../registerPage/images/image-2.png";

interface loginPageProps{
    setIsLogin: Dispatch<SetStateAction<boolean>>
}
function LoginPage(props: loginPageProps) {
    return (
        <div className="inner">
            <img src={woman} alt="" className="image-1"/>
            <form action="" className={'registerForm'}>
                <h3>Sign in</h3>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Username"/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-lock"></span>
                    <input type="password" className="form-control" placeholder="Password"/>
                </div>
                <button className={'registerButton'}>
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