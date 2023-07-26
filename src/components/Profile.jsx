import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { AiOutlineEdit } from 'react-icons/ai';
import { currencies } from '../currencies';
import { child, get, ref, set, update } from 'firebase/database';
import { dbs } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [currency, setCurrency] = useState(currencies[0])
    const [success, setSuccess] = useState(false)
    const [success1, setSuccess1] = useState(false)
    const [subscribed, setSubscribed] = useState('')

    const cancel = useRef()

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            setFName(snapshot.val().f_name)
            setLName(snapshot.val().l_name)
            setCurrency(snapshot.val().currency)
            setSubscribed(snapshot.val().subscribed)
        })
    }, [])


    const updateUser = () => {
        update(userDoc, {
            f_name: fName,
            l_name: lName,
            currency: currency
        }).then(() => {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 4000)
        })
    }

    const reset = () => {
        set(userDoc, {
            f_name: fName,
            l_name: lName,
            email: email,
            currency: currency,
            tApps: 0,
            tPatients: 0
        }).then(() => {
            setSuccess1(true)
            setTimeout(() => {
                setSuccess1(false)
                cancel.current.click()
            }, 3000);
        })
    }


  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-4">
            <h3 className='dash-heading mb-2 me-4'>Profile</h3>
        </div>

        <div className="dash-card">
            <div className="row">
                <div className="col-lg-6 mt-3">
                    <div className="modal-field">
                        <label>First Name</label>
                        <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className='modal-input' />
                    </div>
                </div>
                <div className="col-lg-6 mt-3">
                    <div className="modal-field">
                        <label>Last Name</label>
                        <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className='modal-input' />
                    </div>
                </div>
                {/* <div className="col-lg-6 mt-3">
                    <div className="modal-field">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='modal-input' />
                    </div>
                </div> */}
                <div className="col-lg-6 mt-3">
                    <div className="modal-field">
                        <label>Currency</label>
                        <div className="dropdown modal-dropdown">
                            <button
                                className="btn shadow-none"
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
                {/* <h5 className='mt-3'>Update Password</h5>
                <div className="col-md-6 col-lg-4 mt-3">
                    <div className="modal-field">
                        <label>Current Password</label>
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className='modal-input' />
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 mt-3">
                    <div className="modal-field">
                        <label>New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='modal-input' />
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 mt-3">
                    <div className="modal-field">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='modal-input' />
                    </div>
                </div> */}
                <h6 className={`success-msg ${success && 'active'} text-success mt-3`} style={{ fontStyle: 'normal' }}>Profile updated! Your changes have been saved.</h6>
                <div className="col-12 mt-5 d-flex align-items-center justify-content-end">
                    <button className='modal-save' onClick={updateUser}>Save</button>
                </div>
                <div className="col-12 mt-3 d-flex align-items-center justify-content-end">
                    {
                        subscribed === false && (
                            <Link to={'/pricing'} className='primary-btn shadow-none me-2 fs-9 profile-subscribe-btn rounded'>
                                <img src="../../assets/icons/premium.png" alt="" />
                                Subscribe
                            </Link>
                        )
                    }
                    <button className='btn bg-soft-danger shadow-none fs-9 text-danger' data-bs-toggle="modal" data-bs-target="#resetModal">Reset Dashboard</button>
                </div>
            </div>
        </div>



        {/* /////////////// MODALS /////////////// */}
        <div
            className="modal fade"
            id="resetModal"
            tabIndex={-1}
            aria-labelledby="resetModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Reset Dashboard</h5>

                        <p>
                            Resetting the dashboard will remove all your data such as appointments, patients, reports, etc... Please confirm that you want to proceed.
                        </p>

                        <h6 className={`success-msg ${success1 && 'active'} text-success`} style={{ fontStyle: 'normal' }}>Your dashboard has been reset.</h6>
                                
                        <div className="row">
                            <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                <button className='modal-cancel me-2' ref={cancel} data-bs-dismiss='modal'>Cancel</button>
                                <button className='modal-save bg-danger' onClick={reset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Profile