import { child, get, ref } from 'firebase/database'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db, dbs } from '../firebase'

const DashboardHeader = () => {

    const [name, setName] = useState({
        fName: '',
        lName: ''
    })

    const userId = localStorage.getItem('user')

    var date = new Date().getHours()

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((userDoc) => {
            setName({
                fName: userDoc.val().f_name,
                lName: userDoc.val().l_name,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    
  return (
    <div className='dash-header'>
        <div className="dash-header-left">
            <h2>Good {date < 13 ? 'Morning' : date < 17 ? 'After noon' : 'Evening'} {name.fName}!</h2>
        </div>
        <div className="dash-header-right">
            <Link to={'/help'} className='dash-header-navlink'>
                <img src="../../assets/icons/help.png" alt="" />
            </Link>
            <Link to={'/dashboard/notifications'} className='dash-header-navlink'>
                <img src="../../assets/icons/notifications.png" alt="" />
            </Link>
            <Link to={'/dashboard/profile'} className='dash-profile-link'>
                <img src="../../assets/icons/profile.png" alt="" />
                Dr. {name.fName} {name.lName}
            </Link>
        </div>
    </div>
  )
}

export default DashboardHeader