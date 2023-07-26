import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../firebase'
import { db } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, child } from "firebase/database";

const Login = () => {

    document.title = 'Login - DocNek'

    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const [errmsg, setErrmsg] = useState('')

    const handleErr = (error) => {
        setErrmsg(error)
        setErr(true)
        setTimeout(() => {
            setErr(false)
        }, 4000);
    }

    const login = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            localStorage.setItem('user', user.uid)
            navigate('/dashboard/panel');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            errorCode == 'auth/user-not-found' && handleErr('User doesn\'t exist')
            errorCode == 'auth/wrong-password' && handleErr('Incorrect Password')
            // ..
        });
    }

  return (
    <div className='container-fluid signup'>
        <div className="row h-100">
            <div className="col-lg-8 h-100 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10 my-5">
                    <Link to={'/'} className='auth-logo mb-5 d-block'>
                        <img src="../../assets/img/logo.svg" alt="" />
                    </Link>
                    <h3 className='mb-4'>Login to Your Account</h3>
                    {/* <button className="auth-method-btn mb-4">
                        <span className='auth-method-icon'><FcGoogle /></span>
                        Login with Google
                    </button>
                    <div className="auth-or mb-4">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div> */}
                    <form onSubmit={login}>
                        <div className="form-group mb-4">
                            <label className='form-label'>Email</label>
                            <div className="signup-input">
                                <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className='form-label'>Password</label>
                            <div className="signup-input">
                                <input type={show ? 'text' : 'password'} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required/>
                                <span className='hide-password' onClick={() => setShow(!show)}>
                                    { show ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                                </span>
                            </div>
                        </div>
                        <button className='signup-submit text-dark'>Login</button>
                        <h6 className={`text-center text-danger mt-3 mb-0 err-msg ${err && 'active'}`}>{errmsg}</h6>
                    </form>
                    <p className='auth-par mt-3 text-center'>
                        Don't have an account yet? <Link to={'/signup'}>Signup</Link>
                    </p>
                </div>
            </div>
            <div className="col-lg-4 pe-0 h-100 signup-img d-none d-lg-block">
                <img src='../../assets/img/signup.jpg' alt="" />
            </div>
        </div>
    </div>
  )
}

export default Login