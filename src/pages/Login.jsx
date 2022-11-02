import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupImg from '../assets/img/signup.jpg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { auth } from '../firebase'
import { db } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, child } from "firebase/database";

const Login = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [name, setName] = useState('')


    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {

            navigate('/dashboard/links');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

  return (
    <div className='container-fluid signup'>
        <div className="row h-100">
            <div className="col-lg-8 h-100 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10 my-5">
                    <Link to={'/'}><h1 className='text-dark fw-bold mb-5'>LOGO</h1></Link>
                    <h3>Login to Your Account</h3>
                    <div className="form-group mb-4">
                        <label className='form-label'>Email</label>
                        <div className="signup-input">
                            <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className='form-label'>Password</label>
                        <div className="signup-input">
                            <input type={show ? 'text' : 'password'} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
                            <span className='hide-password' onClick={() => setShow(!show)}>
                                { show ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                            </span>
                        </div>
                    </div>
                    <button className='signup-submit text-dark' onClick={login}>Create Account</button>
                </div>
            </div>
            <div className="col-lg-4 pe-0 h-100 signup-img d-none d-lg-block">
                <img src={signupImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Login