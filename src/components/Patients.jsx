import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbCheck } from 'react-icons/tb'
import { CiEdit } from 'react-icons/ci'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { db, dbs } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { child, get, ref, update } from 'firebase/database';

const Patients = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const cancel1 = useRef()
    const cancel2 = useRef()

    const date = new Date().toDateString()

    const [patients, setPatients] = useState([])
    const [tPatients, setTPatients] = useState(0)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState(true)
    const [genderText, setGenderText] = useState('')
    const [notes, setNotes] = useState('')
    const [visitDate, setVisitDate] = useState('')
    const [id, setId] = useState('')
    const [notifications, setNotifiations] = useState([])

    const [editIndex, setEditIndex] = useState(0)

    const [exist, setExist] = useState('')

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            setTPatients(snapshot.val().tPatients)
            if (snapshot.val().patients !== undefined) {
                setPatients(snapshot.val().patients)
                setExist(true)
            } else {
                setExist(false)
            }

            if (snapshot.val().notifications !== undefined) {
                setNotifiations(snapshot.val().notifications)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (patients.length) {
            update(userDoc, {
                patients: patients
            })
        }
    }, [patients])

    useEffect(() => {
        if (tPatients !== 0) {
            update(userDoc, {
                tPatients: tPatients
            })
        }
    }, [tPatients])

    useEffect(() => {
        if (gender === true) {
            setGenderText('Male')
        } else {
            setGenderText('Female')
        }
    }, [gender])

    useEffect(() => {
        if (notifications.length) {
            update(userDoc, {
                notifications: notifications
            })
        }
    }, [notifications])

    const addNotification = (text) => {
        var notDate = new Date()
        setNotifiations([{
            date: notDate,
            text: text
        }, ...notifications])
    }
    
    const emptyVar = () => {
        setName('')
        setAge('')
        setPhone('')
        setNotes('')
        setExist(true)
    }

    const handleAdd = () => {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        setPatients([{
            id: id,
            name: name,
            age: age,
            phone: phone,
            gender: genderText,
            notes: notes,
            visitDate: date
        }, ...patients])
        addNotification(`Patient ${name} has been added to your dashboard.`)
        emptyVar()
        setTPatients(tPatients + 1)
        setExist(true)
        cancel1.current.click()
    }

    const handleRemove = index => {
        const newPatients = [...patients];
        newPatients.splice(index, 1);
        setPatients(newPatients);
        if (patients.length == 1) {
            update(userDoc, {
                patients: []
            })
            setExist(false)
        }
    }

    const handlePopup = (item, i) => {
        setName(item.name)
        setAge(item.age)
        if (item.gender === 'Male') {
            setGender(true)
        } else {
            setGender(false)
        }
        setPhone(item.phone)
        setNotes(item.notes)
        setVisitDate(item.visitDate)
        setId(item.id)
        setEditIndex(i)
    }

    const handleEdit = () => {
        const newPatients = [...patients]
        newPatients[editIndex] = {
            id: id,
            age: age,
            gender: genderText, 
            name: name,
            notes: notes,
            phone: phone,
            visitDate: visitDate
        }
        setPatients(newPatients)
        emptyVar()
        cancel2.current.click()
    }

  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-4">
            <h3 className='dash-heading mb-2 me-4'>Patients</h3>
            <button className='primary-btn mb-2 rounded-3' onClick={emptyVar} data-bs-toggle="modal" data-bs-target="#addModal">+ Add Patient</button>
        </div>

        <div className="dash-card">

            {
                exist === '' && (
                    <div className="d-flex justify-content-center my-4">
                        <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                    </div>
                )
            }

            {
                exist && (
                    <div className="table-responsive">
                        <table className="table dash-table">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Visit date</td>
                                    <td>Age</td>
                                    <td>Gender</td>
                                    <td>Phone number</td>
                                    <td>Notes</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patients.map((patient, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h6 className='app-patient'>{patient.name}</h6>
                                            </td>
                                            <td className='app-date'>
                                                {patient.visitDate}
                                            </td>
                                            <td className='app-date'>
                                                {patient.age}
                                            </td>
                                            <td className='app-date'>
                                                {patient.gender}
                                            </td>
                                            <td className='app-date'>
                                                {patient.phone}
                                            </td>
                                            <td>
                                                <p className='app-reason mb-0'>
                                                    {patient.notes}
                                                </p>
                                            </td>
                                            <td>
                                                <div className='app-action'>
                                                    <button className='text-primary bg-soft-primary me-2' onClick={() => handlePopup(patient, index)} data-bs-toggle="modal" data-bs-target="#editModal">
                                                        <AiOutlineEdit />
                                                    </button>
                                                    <button className='text-danger bg-soft-danger' onClick={() => handleRemove(index)}>
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )   
            }

            {
                exist === false && (
                    <div className="empty">
                        <img src="../../assets/img/empty-patients.png" alt="" />
                        <p>
                            No patients added yet. <br />
                            <Link to={'#'} data-bs-toggle="modal" data-bs-target="#addModal">Add </Link> your first patient now!
                        </p>
                    </div>
                )
            }
        </div>



        {/* ////////// MODAL ////////// */}
        <div
            className="modal fade"
            id="addModal"
            tabIndex={-1}
            aria-labelledby="addModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Add Patient</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Name</label>
                                    <input type="text" className='modal-input' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Age</label>
                                    <input type="number" className='modal-input' value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Patient Phone Number</label>
                                    <input type="text" className='modal-input' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Patient Gender</label>
                                    <div className="modal-checks">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={gender ? true : false}
                                                onChange={() => setGender(!gender)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Male
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                checked={gender === false ? true : false}
                                                onChange={() => setGender(!gender)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Notes</label>
                                    <textarea className='modal-textarea' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                                
                        <div className="row">
                            <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                <button className='modal-cancel me-2' ref={cancel1} data-bs-dismiss='modal'>Cancel</button>
                                <button className='modal-save' onClick={handleAdd}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            className="modal fade"
            id="editModal"
            tabIndex={-1}
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Add Patient</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Name</label>
                                    <input type="text" className='modal-input' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Age</label>
                                    <input type="number" className='modal-input' value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Patient Phone Number</label>
                                    <input type="text" className='modal-input' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Patient Gender</label>
                                    <div className="modal-checks">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                checked={gender ? true : false}
                                                onChange={() => setGender(!gender)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Male
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                checked={gender === false ? true : false}
                                                onChange={() => setGender(!gender)}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Notes</label>
                                    <textarea className='modal-textarea' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                                
                        <div className="row">
                            <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                <button className='modal-cancel me-2' ref={cancel2} data-bs-dismiss='modal'>Cancel</button>
                                <button className='modal-save' onClick={handleEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default Patients