import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import { Routes, Route } from 'react-router-dom'
import Links from '../components/Links'
import Analytics from '../components/Analytics'

const Dashboard = () => {
  return (
    <div>
        <DashboardHeader />
        <Routes>
            <Route path='/links' element={<Links />} />
            <Route path='/analytics' element={<Analytics />} />
        </Routes>
    </div>
  )
}

export default Dashboard