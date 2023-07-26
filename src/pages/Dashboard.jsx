import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { child, get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Analytics from '../components/Analytics'
import Appointments from '../components/Appointments'
import DashboardHeader from '../components/DashboardHeader'
import Medicines from '../components/Medicines'
import Notifications from '../components/Notifications'
import Panel from '../components/Panel'
import Patients from '../components/Patients'
import Profile from '../components/Profile'
import Reports from '../components/Reports'
import Sidebar from '../components/Sidebar'
import { dbs } from '../firebase'

const Dashboard = () => {

  document.title = 'All-in-one Medical Software - DocNek'

  const [header, setHeader] = useState(false)
  const navigate = useNavigate()

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var date = new Date().getTime()
        const uid = user.uid;
        get(child(ref(dbs, 'users'), uid))
        .then((snapshot) => {
          const creationDate = new Date(snapshot.val().creationDate)
          const subscribed = snapshot.val().subscribed
  
          if (date - creationDate > 604800000 && subscribed === false) {
            navigate('/trialEnded')
          } else {
            //
          }
        })
        // ...
      } else {
        // User is signed out
        // ...
        navigate('/login')
      }
    });
  }, [])

  return (
    <div className='dashboard'>
        
        <Sidebar active={header} />

        <div className="dashboard-right">

          <DashboardHeader />

          <Routes>
            <Route path='/panel' element={<Panel />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/patients' element={<Patients />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/medicines' element={<Medicines />} />
          </Routes>

          <div className={`dash-menu-toggle ${header && 'active'}`} onClick={() => setHeader(!header)}>
              <div className="line1"></div>
              <div className="line2"></div>
          </div>

        </div>

    </div>
  )
}

export default Dashboard