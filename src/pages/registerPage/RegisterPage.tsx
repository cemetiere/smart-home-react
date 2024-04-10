import React from 'react';
import './RegisterPage.scss'
import woman from './images/image-1.png'
import flower from './images/image-2.png'

function RegisterPage() {
    return (
        <div className="inner">
            <img src={woman} alt="" className="image-1"/>
            <form action="" className={'registerForm'}>
                <h3>New Account?</h3>
                <div className="form-holder">
                    <span className="lnr lnr-user"></span>
                    <input type="text" className="form-control" placeholder="Username"/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-phone-handset"></span>
                    <input type="text" className="form-control" placeholder="Phone Number"/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-envelope"></span>
                    <input type="text" className="form-control" placeholder="Mail"/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-lock"></span>
                    <input type="password" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-holder">
                    <span className="lnr lnr-lock"></span>
                    <input type="password" className="form-control" placeholder="Confirm Password"/>
                </div>
                <button className={'registerButton'}>
                    <span>Register</span>
                </button>
            </form>
            <img src={flower} alt="" className="image-2"/>


        </div>
    );
}

export default RegisterPage;