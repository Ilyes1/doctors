import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbCheck } from 'react-icons/tb'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { setDoc, doc, getDoc, updateDoc, setIndexConfiguration } from "firebase/firestore"; 
import { db, dbs } from '../firebase';
import { useEffect } from 'react';
import { child, get, ref, update } from 'firebase/database';


const Appointments = () => {

    const [value, setValue] = useState(moment(Date.now()));

    const date = new Date().toDateString()

    const cancel1 = useRef()
    const cancel2 = useRef()

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState('')
    const [addPatient, setAddPatient] = useState(false)
    const [done, setDone] = useState(0)
    const [apps, setApps] = useState([])
    const [tApps, setTApps] = useState(0)
    const [cApps, setCApps] = useState([])
    const [tPatients, setTPatients] = useState(0)
    const [exist, setExist] = useState('')

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const [reason, setReason] = useState('')
    const [addNotes, setAddNotes] = useState('')

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState(true)
    const [genderText, setGenderText] = useState('')
    const [notes, setNotes] = useState('')
    const [income, setIncome] = useState('')
    const [remove, setRemove] = useState(false)
    const [incomes, setIncomes] = useState([])
    const [appIndex, setAppIndex] = useState(0)
    const [notifications, setNotifiations] = useState([])
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [cIncomes, setCIncomes] = useState([])
    const [popupDate, setPopupDate] = useState('')


    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            setTApps(snapshot.val().tApps)
            setTPatients(snapshot.val().tPatients)
            if (snapshot.val().patients !== undefined) {
                setPatients(snapshot.val().patients)
                setPatient({
                    name: snapshot.val().patients[0].name,
                    id: snapshot.val().patients[0].id
                })
            } else {
                setPatient({
                    name: '-',
                    id: ''
                })
            }
            if (snapshot.val().appointments !== undefined) {
                setApps(snapshot.val().appointments)
                setExist(true)
            } else {
                setExist(false)
            }
            if (snapshot.val().cAppointments !== undefined) {
                setCApps(snapshot.val().cAppointments)
            }
            if (snapshot.val().incomes !== undefined) {
                setIncomes(snapshot.val().incomes)
            } else {
                //
            }
            if (snapshot.val().notifications !== undefined) {
                setNotifiations(snapshot.val().notifications)
            }
            if (snapshot.val().cIncomes !== undefined) {
                setCIncomes(snapshot.val().cIncomes)
                const tti = snapshot.val().cIncomes.reduce((accumulator, currentValue) => {
                    return accumulator + parseInt(currentValue.amount)
                  }, 0);
                setTotalIncomes(tti)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (apps.length) {
            update(userDoc, {
                appointments: apps
            })
        }
    }, [apps])

    useEffect(() => {
        if (tApps !== 0) {
            update(userDoc, {
                tApps: tApps
            })
        }
    }, [tApps])

    useEffect(() => {
        if (tPatients !== 0) {
            update(userDoc, {
                tPatients: tPatients
            })
        }
    }, [tPatients])

    useEffect(() => {
        if (patients.length) {
            update(userDoc, {
                patients: patients
            })
        }
    }, [patients])

    useEffect(() => {
        if (incomes.length) {
            update(userDoc, {
                incomes: incomes
            })
        }
    }, [incomes])

    useEffect(() => {
        if (cApps.length) {
            update(userDoc, {
                cAppointments: cApps
            })
        }
    })

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

    useEffect(() => {
        if (cIncomes.length) {
            update(userDoc, {
                cIncomes: cIncomes
            })
        }
    }, [cIncomes])

    const addNotification = (text) => {
        var notDate = new Date()
        setNotifiations([{
            date: notDate,
            text: text
        }, ...notifications])
    }
    
    const emtyVal = () => {
        setReason('')
        setAddNotes('')
        setAge('')
        setNotes('')
        setPhone('')
        setName('')
        setIncome('')
    }
    
    const handleAdd = () => {
        if (addPatient === true) {

            const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            setApps([{
                date: value._d.toDateString(),
                reason: reason,
                patientName: name,
                patientId: id,
                notes: addNotes,
                status: 'scheduled'
            }, ...apps])
            
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

            // setCApps([{
            //     date: value._d.toDateString()
            // }, ...cApps])

            setTPatients(tPatients + 1)
        } else {
            setApps([{
                date: value._d.toDateString(),
                reason: reason,
                patientName: patient.name,
                patientId: patient.id,
                notes: addNotes,
                status: 'scheduled'
            }, ...apps])

            // setCApps([{
            //     date: value._d.toDateString()
            // }, ...cApps])
        }
        emtyVal()
        setExist(true)
        cancel1.current.click()
    }

    const handleRemove = index => {
        const newApps = [...apps];
        newApps.splice(index, 1);
        setApps(newApps);
        if (apps.length == 1) {
            update(userDoc, {
                appointments: []
            })
            setExist(false)
        }
    }

    const handlePopup = (item, index) => {
        setPatient({
            name: item.patientName,
            id: item.patientId
        })
        setAppIndex(index)
        setPopupDate(item.date)
    }

    const handleDone = () => {

        var newApps = [...apps]
        newApps[appIndex].status = 'completed'
        setApps(newApps)

        if (done === 1) {
            setApps([{
                date: value._d.toDateString(),
                reason: reason,
                patientName: patient.name,
                patientId: patient.id,
                notes: addNotes,
                status: 'scheduled'
            }, ...apps])
            setCApps([{
                date: popupDate
            }, ...cApps])
            setTApps(tApps + 1)
        } else if (done === 2) {
            var date = new Date().toDateString()
            setCApps([{
                date: popupDate
            }, ...cApps])
            setTApps(tApps + 1)
            if (income) {
                setIncomes([{
                    amount: income,
                    date: date,
                    notes: `Received payment from Patient ${patient.name}`
                }, ...incomes])
                setCIncomes([{
                    date: date,
                    amount: income
                }, ...cIncomes])
                setTotalIncomes(totalIncomes + parseInt(income))
            }
            if (remove === true) {
                var newPatients = patients.filter(item => item.id !== patient.id)
                setPatients(newPatients);
                if (patients.length == 1) {
                    update(userDoc, {
                        patients: []
                    })
                }
            }
        }

        addNotification(`Appointment with ${patient.name} is now marked as completed.`)
        emtyVal()
        setTApps(tApps + 1)
        cancel2.current.click()
    }
    

  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-5">
            <h3 className='dash-heading mb-2 me-4'>Appointments</h3>
            <button className='primary-btn mb-2 rounded-3' data-bs-toggle="modal" data-bs-target="#addModal">+ Add Appointment</button>
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
                                    <td>Patient</td>
                                    <td>Date</td>
                                    <td>Reason</td>
                                    <td>Status</td>
                                    <td>Notes</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    apps.map((app, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h6 className='app-patient'>{app.patientName}</h6>
                                            </td>
                                            <td className='app-date'>
                                               {app.date}
                                            </td>
                                            <td>
                                                <p className='app-reason mb-0'>
                                                    {app.reason}
                                                </p>
                                            </td>
                                            <td>
                                                {
                                                    app.status === 'scheduled' ? (
                                                        <div className="app-status bg-soft-primary text-primary">
                                                            Scheduled
                                                        </div>
                                                    ) : (
                                                        <div className="app-status bg-soft-success text-success">
                                                            Completed
                                                        </div>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <p className='app-notes mb-0'>
                                                    {app.notes}
                                                </p>
                                            </td>
                                            <td>
                                                <div className='app-action'>
                                                    <button className='text-danger bg-soft-danger me-2' onClick={() => handleRemove(index)}>
                                                        <IoClose />
                                                    </button>
                                                    {
                                                        app.status === 'scheduled' && (
                                                            <button onClick={() => handlePopup(app, index)} className='text-success bg-soft-success' data-bs-toggle="modal" data-bs-target="#doneModal">
                                                                <TbCheck />
                                                            </button>
                                                        )
                                                    }
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
                        <img src="../../assets/img/empty-app.png" alt="" />
                        <p>
                            No appointments scheduled. <br />
                            <Link to={'#'} data-bs-toggle="modal" data-bs-target="#addModal">Add </Link> your first one now!
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
            aria-hidden="false"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Add Appointment</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Date</label>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <MobileDatePicker
                                            className='date-picker'
                                            // label="Enter date"
                                            value={value}
                                            onChange={(newValue) => {
                                              setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Reason</label>
                                    <input 
                                        type="text" 
                                        className='modal-input' 
                                        value={reason} 
                                        onChange={(e) => setReason(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Notes</label>
                                    <textarea 
                                        className='modal-textarea'
                                        value={addNotes} 
                                        onChange={(e) => setAddNotes(e.target.value)} 
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Choose Patient</label>
                                    <div className="dropdown modal-dropdown">
                                        <button
                                            className="btn shadow-none"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {patient.name !== '' ? patient.name : '-'}
                                            <img src="../../assets/icons/down.png" alt="" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            {
                                                patients.map((patient, index) => (
                                                    <li key={index} onClick={() => setPatient({name: patient.name, id: patient.id})}>{patient.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field"> 
                                    <label>Add New Patient</label>
                                    <button className='modal-btn' onClick={() => setAddPatient(!addPatient)}>+ Add Patient</button>
                                </div>
                            </div>
                        </div>
                        {
                            addPatient && (
                                <div className="row">
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Patient Name</label>
                                            <input type="text" className='modal-input' value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Patient Age</label>
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
                                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className='modal-textarea'></textarea>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
            id="doneModal"
            tabIndex={-1}
            aria-labelledby="doneModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Appointment Completed</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <button className={`modal-btn ${done == 1 && 'active'}`} onClick={() => setDone(1)}>+ Add Next Appointment</button>
                                </div>  
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <button className={`modal-btn ${done == 2 && 'active'}`} onClick={() => setDone(2)}>Finalize Treatment</button>
                                </div>  
                            </div>
                        </div>

                        {
                            done === 1 && (
                                <div className="row">
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Date</label>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <MobileDatePicker
                                                    className='date-picker'
                                                    // label="Enter date"
                                                    value={value}
                                                    onChange={(newValue) => {
                                                    setValue(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Reason</label>
                                            <input 
                                                type="text" 
                                                className='modal-input' 
                                                value={reason} 
                                                onChange={(e) => setReason(e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="modal-field">
                                            <label>Notes</label>
                                            <textarea 
                                                className='modal-textarea'
                                                value={addNotes} 
                                                onChange={(e) => setAddNotes(e.target.value)} 
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            done === 2 && (
                                <div className="row">
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Last Income</label>
                                            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className='modal-input' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-3">
                                        <div className="modal-field">
                                            <label>Remove Patient</label>
                                            <div className="modal-checks">
                                                <div className="form-check me-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        checked={remove === false ? false : true}
                                                        onChange={() => setRemove(!remove)}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Yes
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        checked={remove === true ? false : true}
                                                        onChange={() => setRemove(!remove)}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            done !== 0 && (
                                <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                    <button className='modal-cancel me-2' ref={cancel2} data-bs-dismiss='modal'>Cancel</button>
                                    <button className='modal-save' onClick={handleDone}>Done</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default Appointments