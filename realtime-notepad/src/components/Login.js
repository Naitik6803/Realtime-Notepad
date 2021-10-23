import React, { useState } from 'react'
import '../style/Login.css'

const Login = () => {
    const [login, setlogin] = useState('active');
    const dislogin = () => {
        if(login === 'none'){
            setlogin('active');
            document.getElementById('form_login').classList.add('active');
            document.getElementById('form_sign').classList.remove('active');
        }
    }
    const dissign = () => {
        if(login === 'active'){
            setlogin('none');
            document.getElementById('form_login').classList.remove('active');
            document.getElementById('form_sign').classList.add('active');
        }
    }
    return (
        <div className='login_page'>
            <div className="login_component">
                <div className="login">
                    <div className="login_op option" onClick={dislogin}><span className="circle"></span>Login. <span> Already a user? </span></div>
                    <form className='login_form active' id='form_login'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Continue</button>
                    </form>
                </div>
                <div className="signup">
                    <div className="sign_op option" onClick={dissign}>Create Account. <span>New user?</span></div>
                    <form className='login_form' id='form_sign'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login