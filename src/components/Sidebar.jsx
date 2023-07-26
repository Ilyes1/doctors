import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { BsCalendarCheck } from 'react-icons/bs'
import { getAuth, signOut } from 'firebase/auth'

const Sidebar = ({ active }) => {

    const auth = getAuth()

    const handleSignout = () => {
        signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
        })
        .catch((error) => {
            console.log("Error signing out:", error);
        });
    }
    
  return (
    <div className={`sidebar ${active ? 'active' : ''}`}>
        
        <Link to={'/'}>
            <img src="../../assets/img/logo.svg" className='dash-logo' alt="" />
        </Link>

        <div className="sidebar-links">
            <NavLink to={'panel'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/dashboard.png' alt='' />
                </div>
                Dashboard
            </NavLink>
            <NavLink to={'appointments'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/appointments.png' alt='' />
                </div>
                Appointments
            </NavLink>
            <NavLink to={'patients'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/patients.png' alt='' />
                </div>
                Patients
            </NavLink>
            <NavLink to={'analytics'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/analytics.png' alt='' />
                </div>
                Analytics
            </NavLink>
            <NavLink to={'reports'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/reports.png' alt='' />
                </div>
                Reports
            </NavLink>
            <NavLink to={'profile'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/profile.png' alt='' />
                </div>
                Profile
            </NavLink>
            <NavLink to={'medicines'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/medicines.png' alt='' />
                </div>
                Medicines
            </NavLink>
            <NavLink to={'notifications'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/notifications.png' alt='' />
                </div>
                Notifications
            </NavLink>
            <NavLink to={'/help'} activeClassName='active'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/help.png' alt='' />
                </div>
                Help & Support
            </NavLink>
            <NavLink to={'/feedback'} className='bg-white'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/feed.png' alt='' />
                </div>
                Your Opinion Matters
            </NavLink>
            <NavLink to={'#'} onClick={handleSignout} className='bg-white'>
                <div className="sidebar-icon">
                    <img src='../../assets/icons/logout.png' alt='' />
                </div>
                Logout
            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar