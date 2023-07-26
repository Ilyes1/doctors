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
import { child, get, ref, update } from 'firebase/database';
import { dbs } from '../firebase';
import { useRef } from 'react';

const Medicines = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const cancel1 = useRef()
    const cancel2 = useRef()

    const [medicines, setMedicines] = useState([])
    const [exist, setExist] = useState('')

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [notes, setNotes] = useState('')

    const [editIndex, setEditIndex] = useState(0)

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            if (snapshot.val().medicines !== undefined) {
                setMedicines(snapshot.val().medicines)
                setExist(true)
            } else {
                setExist(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (medicines.length) {
            update(userDoc, {
                medicines: medicines
            })
        }
    }, [medicines])

    const emptyVar = () => {
        setName('')
        setQuantity('')
        setNotes('')
    }

    const handleAdd = () => {
        setMedicines([{
            name: name,
            quantity: quantity,
            notes: notes,
        }, ...medicines])
        emptyVar()
        setExist(true)
        cancel1.current.click()
    }

    const handleRemove = index => {
        const newMedicines = [...medicines];
        newMedicines.splice(index, 1);
        setMedicines(newMedicines);
        if (medicines.length == 1) {
            update(userDoc, {
                medicines: []
            })
            setExist(false)
        }
    }

    const handlePopup = (item, i) => {
        setName(item.name)
        setQuantity(item.quantity)
        setNotes(item.notes)
        setEditIndex(i)
    }

    const handleEdit = () => {
        const newMedicines = [...medicines]
        newMedicines[editIndex] = {
            name: name,
            notes: notes,
            quantity: quantity
        }
        setMedicines(newMedicines)
        emptyVar()
        cancel2.current.click()
    }

  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-4">
            <h3 className='dash-heading mb-2 me-4'>Medicines</h3>
            <button className='primary-btn mb-2 rounded-3' data-bs-toggle="modal" data-bs-target="#addModal">+ Add Medicine</button>
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
                exist === true && (
                    <div className="table-responsive">
                        <table className="table dash-table">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>Notes</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    medicines.map((medicine, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h6 className='app-patient'>{medicine.name}</h6>
                                            </td>
                                            <td className='app-date'>
                                                {medicine.quantity}
                                            </td>
                                            <td>
                                                <p className='app-reason mb-0'>
                                                    {medicine.notes}
                                                </p>
                                            </td>
                                            <td>
                                                <div className='app-action'>
                                                    <button onClick={() => handlePopup(medicine, index)} className='text-primary bg-soft-primary me-2' data-bs-toggle="modal" data-bs-target="#editModal">
                                                        <AiOutlineEdit />
                                                    </button>
                                                    <button onClick={() => handleRemove(index)} className='text-danger bg-soft-danger'>
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
                        <img src="../../assets/img/empty-medicines.png" alt="" />
                        <p>
                            No medicines added yet. <br />
                            <Link to={'#'} data-bs-toggle="modal" data-bs-target="#addModal">Add</Link> your first medicine now!
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
                        <h5 className='modal-heading'>Add Medicine</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Name</label>
                                    <input type="text" className='modal-input' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Quantity</label>
                                    <input type="number" className='modal-input' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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
                        <h5 className='modal-heading'>Edit Medicine</h5>

                        <div className="row">
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Name</label>
                                    <input type="text" className='modal-input' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="modal-field">
                                    <label>Quantity</label>
                                    <input type="number" className='modal-input' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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

export default Medicines