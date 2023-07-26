import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { auth, dbs } from '../firebase'
import { db } from '../firebase'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { currencies } from '../currencies'
import { child, ref, set } from 'firebase/database'

const Signup = () => {

    document.title = 'Signup - DocNek'

    const navigate = useNavigate()

    const [currency, setCurrency] = useState(currencies[0])

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [Fname, setFname] = useState('')
    const [Lname, setLname] = useState('')
    const [err, setErr] = useState(false)
    const [errmsg, setErrmsg] = useState('')
    const [check, setCheck] = useState(false)

    const link = useRef()

    const handleErr = (error) => {
        setErrmsg(error)
        setErr(true)
        setTimeout(() => {
            setErr(false)
        }, 4000);
    }



    const signup = () => {

        if (password !== cpassword) {
            handleErr('Passwords do not match. Please re-confirm your password.')
        } else if (check === false) {
            handleErr('Please select the checkbox to confirm your agreement.')
        } else if (password.length < 6) {
            handleErr('Password must be at least 6 characters.')
        } else {
            const auth = getAuth();
            var date = new Date()
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                set(child(ref(dbs, 'users'), user.uid), {
                    f_name: Fname, 
                    l_name: Lname,
                    email: email,
                    currency: currency,
                    tApps: 0,
                    tPatients: 0,
                    creationDate: date.getTime(),
                    subscribed: false
                })

                localStorage.setItem('user', user.uid)
                navigate('/dashboard/panel');
    
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errorCode === 'auth/email-already-in-use' && handleErr('Email already exists.')
                // ..
            });
        }

    }

    // const subscribe = () => {

    //     if (password !== cpassword) {
    //         handleErr('Passwords do not match. Please re-confirm your password.')
    //     } else if (check === false) {
    //         handleErr('Please select the checkbox to confirm your agreement.')
    //     } else if (password.length < 6) {
    //         handleErr('Password must be at least 6 characters.')
    //     } else {
    //         const auth = getAuth();
    //         var date = new Date()
    //         createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
                
    //             set(child(ref(dbs, 'users'), user.uid), {
    //                 f_name: Fname, 
    //                 l_name: Lname,
    //                 email: email,
    //                 currency: currency,
    //                 tApps: 0,
    //                 tPatients: 0,
    //                 creationDate: date.getTime(),
    //                 subscribed: false
    //             }).then(() => {
    //                 localStorage.setItem('user', user.uid)
    //                 navigate('/checkout')
    //             })

    
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             errorCode === 'auth/email-already-in-use' && handleErr('Email already exists.')
    //             // ..
    //         });
    //     }

    // }


  return (
    <div className='container-fluid signup'>
        <div className="row">
            <div className="col-lg-8 my-5 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10">
                    <Link to={'/'} className='auth-logo mb-5 d-block'>
                        <img src="../../assets/img/logo.svg" alt="" />
                    </Link>
                    <h3>Start Your Journey</h3>
                    {/* <h6 className='text-secondary mb-4'>You can easily update your information later</h6> */}
                    <h6 className='text-secondary mb-4'>Join now and enjoy a 7-day free trial with no credit card required!</h6>
                    {/* <button className="auth-method-btn mb-4" onClick={googleSignup}>
                        <span className='auth-method-icon'><FcGoogle /></span>
                        Continue with Google
                    </button> */}
                    {/* <div className="auth-or mb-4">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div> */}
                    <form onSubmit={e => e.preventDefault()} className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label className='form-label'>First Name</label>
                                <div className="signup-input">
                                    <input type="text" placeholder='First Name...' onChange={(e) => setFname(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label className='form-label'>Last Name</label>
                                <div className="signup-input">
                                    <input type="text" placeholder='Last Name...' onChange={(e) => setLname(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label className='form-label'>Currency</label>
                                <div className="dropdown modal-dropdown">
                                    <button
                                        className="btn shadow-none signup-dropdown-btn"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {currency.name} ({currency.code})
                                        <img src="../../assets/icons/down.png" alt="" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        {
                                            currencies.map((currency, index) => (
                                                <li key={index} onClick={() => setCurrency(currencies[index])}>{currency.name} ({currency.code})</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-4">
                                <label className='form-label'>Email</label>
                                <div className="signup-input">
                                    <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group mb-4">
                                <label className='form-label'>Password</label>
                                <div className="signup-input">
                                    <input type={show1 ? 'text' : 'password'} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required/>
                                    <span className='hide-password' onClick={() => setShow1(!show1)}>
                                        { show1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group mb-4">
                                <label className='form-label'>Confirm Password</label>
                                <div className="signup-input">
                                    <input type={show2 ? 'text' : 'password'} placeholder='Password...' onChange={(e) => setCpassword(e.target.value)} required/>
                                    <span className='hide-password' onClick={() => setShow2(!show2)}>
                                        { show2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group mb-2">
                                <div className="form-check">
                                    <input type="checkbox" id='check' className='form-check-input' onChange={() => setCheck(!check)} />
                                    <label htmlFor='check'>
                                        I aggree with <Link to={'/termsOfService'}>terms of service</Link> and <Link to={'/privacyPolicy'}>privacy policy</Link>.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <button onClick={signup} className='signup-submit'>Start Free Trial</button>
                        </div>
                        {/* <h5 className='mt-3 text-center text-secondary'>Or</h5>
                        <div className="col-12 mt-3">
                            <button onClick={subscribe} className='signup-submit'>
                                <img src="../../assets/icons/premium.png" alt="" />
                                Subscribe
                            </button>
                        </div> */}
                        {/* <a href="https://9469824347268.gumroad.com/l/docnek" ref={link} hidden></a> */}
                        <h6 className={`text-center text-danger mt-3 mb-0 err-msg ${err && 'active'}`}>{errmsg}</h6>
                    </form>
                    <p className='auth-par mt-3 text-center'>
                        Already have account? <Link to={'/login'}>Login</Link>
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

export default Signup