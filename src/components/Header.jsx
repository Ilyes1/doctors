import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-left">
            <Link to={'/'}><h1>LOGO</h1></Link>
        </div>
        <div className="header-right">
            <Link to={'/login'} className='login-navlink'>Login</Link>
            <Link to={'/signup'} className='signup-navlink'>Signup</Link>
        </div>
    </div>
  )
}

export default Header