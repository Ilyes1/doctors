import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut, getAuth } from "firebase/auth";

const DashboardHeader = () => {

    const auth = getAuth()
    const navigate = useNavigate()

    const logout = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    }

  return (
    <div className='header dashboard-header shadow'>
        <div className="header-left d-flex align-items-center">
            <Link to={'/dashboard/links'}><h1 className='mb-0'>LOGO</h1></Link>
            <NavLink to={'links'} className='ms-5' activeClassName='active'>Links</NavLink>
            <NavLink to={'analytics'} className='ms-4' activeClassName='active'>Analytics</NavLink>
        </div>
        <div className="header-right">
            <button className='logout-navlink' onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default DashboardHeader