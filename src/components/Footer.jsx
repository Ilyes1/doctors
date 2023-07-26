import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className="home-footer mt-5">
            <div className="container d-flex align-items-center flex-column py-5">
                <Link to={'/'} className='footer-logo'>
                    <img src="../../assets/img/logo.svg" alt="" />
                </Link>
                <div className="footer-links">
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'}>Contact</Link>
                    <Link to={'/faq'}>FAQ</Link>
                    <Link to={'/help'}>Help</Link>
                    <Link to={'/privacyPolicy'}>Privacy Policy</Link>
                    <Link to={'/termsOfService'}>Terms of Service</Link>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Signup</Link>
                </div>
                <div className="footer-line"></div>
                <div className="footer-copyright">
                    Copyright © 2023 DOCNEK. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer