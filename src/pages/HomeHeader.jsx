import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomeHeader = () => {

  const [header, setHeader] = useState(false)
  const [link, setLink] = useState(false)

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setLink(true)
        // ...
      } else {
        // User is signed out
        // ...
        setLink(false)
      }
    });
  }, [])

  return (
    <>
      <div className='header home-header'>
          <div className="header-left">
                <Link to={'/'} className='header-logo'>
                    <img src="../../assets/img/logo.svg" alt="" />
                </Link>
          </div>
          <div className="header-right">
            <Link to={'/about'} className='header-navlink'>About</Link>
            <Link to={'/contact'} className='header-navlink'>Contact</Link>
            <a href={'#pricing'} className='header-navlink'>Pricing</a>
            {
              link === true ? (
                <Link to={'/dashboard/panel'} className='header-navlink'>Dashboard</Link>
              ) : (
                <>
                  <Link to={'/login'} className='login-navlink'>Login</Link>
                  <Link to={'/signup'} className='signup-navlink'>Signup</Link>
                </>
              )
            }
          </div>
          <div className={`menu-toggle ${header && 'active'}`} onClick={() => setHeader(!header)}>
              <div className="line1"></div>
              <div className="line2"></div>
          </div>
      </div>
      <div className={`mobile-header ${header && 'active'}`}>
        <Link to={'/about'} className='mobile-header-navlink'>About</Link>
        <Link to={'/contact'} className='mobile-header-navlink'>Contact</Link>
        <a href="#pricing" className='mobile-header-navlink'>Pricing</a>
        {
          link === true ? (
            <Link to={'/dashboard/panel'} className='mobile-header-navlink'>Dashboard</Link>
          ) : (
            <div className="d-flex">
              <Link to={'/login'} className='signup-navlink'>Login</Link>
              <Link to={'/singup'} className='signup-navlink'>singup</Link>
            </div>
          )
        }
      </div>
    </>
  )
}

export default HomeHeader