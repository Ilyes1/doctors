import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { AiOutlineEdit } from 'react-icons/ai';
import Moment from 'react-moment';
import { child, get, ref, update } from 'firebase/database';
import { dbs } from '../firebase';

const Notifications = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const [notifications, setNotifications] = useState([])
    const [exist, setExist] = useState('')

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            if (snapshot.val().notifications !== undefined) {
                setNotifications(snapshot.val().notifications)
                setExist(true)
            } else {
                setExist(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        const date = new Date()
        console.log(date)
    }, [])

    useEffect(() => {
        if (notifications.length) {
            update(userDoc, {
                notifications: notifications
            })
        }
    }, [notifications])

    const handleRemove = index => {
        const newNotifications = [...notifications];
        newNotifications.splice(index, 1);
        setNotifications(newNotifications);
        if (notifications.length == 1) {
            update(userDoc, {
                notifications: []
            })
            setExist(false)
        }
    }

  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-4">
            <h3 className='dash-heading mb-2 me-4'>Notifications</h3>
        </div>

        {
            exist === true && (
                <>
                    {
                        notifications.map((notification, index) => (
                            <div className="dash-card notification" key={index}>
                                <p>
                                    <Moment fromNow>{notification.date}</Moment>
                                    <IoClose onClick={() => handleRemove(index)} className='del-notif' />
                                </p>
                                {notification.text}
                            </div>
                        ))
                    }
                </>
            )
        }

        {
            exist === false && (
                <div className="empty">
                    <img src="../../assets/img/empty-patients.png" alt="" />
                    <p>
                        No New Notifications.
                    </p>
                </div>
            )
        }



        
    </div>
  )
}

export default Notifications