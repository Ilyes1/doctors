import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Pricing = () => {

    const [link, setLink] = useState('/signup')

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
        
            setLink('/checkout')    

        } else {
        // User is signed out
        // ...
            setLink('/signup')
        }
    });

  return (
    <div>
        
        <Header />

        <section className="py-5">

            <h2 className="section-headline text-center mt-5 mb-4">Choose the Right Plan for Your</h2>

            <div className="container">
                <div className="row">

                    <div className="col-lg-2"></div>
                    <div className="col-lg-4 mt-4">
                        <div className="plan-card">
                            <h3>Monthly</h3>
                            <h1>$24 <span>/ month</span></h1>
                            <ul>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Widgets
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Patients
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Activity
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Analytics
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Appointments
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Drugs inventory
                                </li>
                            </ul>
                            <h5>7 Days Free Trial</h5>
                            <div className="d-flex justify-content-center">
                                <Link to={link} className='primary-btn'>Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-4">
                        <div className="plan-card">
                            <h3>Yearly</h3>
                            <h1>$144 <span>/ year <span className="plan-discount"> (50% OFF)</span></span></h1>
                            <ul>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Widgets
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Patients
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Activity
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Analytics
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Appointments
                                </li>
                                <li>
                                    <span><AiOutlineCheckCircle /></span>
                                    Drugs inventory
                                </li>
                            </ul>
                            <h5>7 Days Free Trial</h5>
                            <div className="d-flex justify-content-center">
                                <Link to={link} className='primary-btn'>Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>

                </div>
            </div>
        </section>

        <Footer />

    </div>
  )
}

export default Pricing