import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import Header from "../components/Header"
import { AiOutlineCheckCircle, AiOutlineFieldTime, AiOutlineGoogle, AiOutlineInstagram, AiOutlineLineChart, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsClipboardData, BsShieldCheck } from 'react-icons/bs'
import { RiUserHeartLine } from 'react-icons/ri'
import { FaFacebookF } from 'react-icons/fa'
import FadeIn from "react-fade-in/lib/FadeIn"
import Footer from "../components/Footer"
import HomeHeader from "./HomeHeader"
import { getAuth, onAuthStateChanged } from "firebase/auth"


const Home = () => {

    document.title = 'Streamline your Practice with our Medica Software - DocNek'

    const [link, setLink] = useState('/signup')

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            
                setLink('/checkout')    
    
            } else {
            // User is signed out
            // ...
                setLink('/signup')
            }
        });
    }, [])

  return (
    <div>
        
        <HomeHeader />

        <div className="banner">
            <FadeIn className="container" transitionDuration={1000}>
                <h1>Streamline Your Practice</h1>
                <h4>A comprehensive solution for managing your <br /> patients and appointments more efficiently.</h4>
                <div className="d-flex flex-wrap mt-4">
                    <Link to="signup" className="primary-btn me-3 mt-2">Get Started</Link>
                </div>
            </FadeIn>
        </div>

        <section className="my-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-3">
                        <img src="../../assets/img/desc-img.jpg" className="img-fluid rounded" alt="" />
                    </div>
                    <div className="col-lg-6 d-flex align-items-center mt-3">
                        <div className="home-description">
                            <h2>Empower your practice and increase productivity </h2>
                            <p>
                                Our doctor dashboard is designed to help medical professionals manage their patients and appointments more efficiently. With features like electronic health records, appointment scheduling, and prescription management, our dashboard streamlines the process of running a practice, saving you time and energy. Try it out today and see the difference it can make in your practice!
                            </p>
                            <Link to={'/signup'} className='primary-btn'>Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="my-5 py-5" id="benefits">

            <h2 className="section-headline text-center mb-4">Experience the Benefits</h2>

            <div className="container">

                <div className="row">

                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <AiOutlineUnorderedList />
                            </div>
                            <h4>Streamlined Practice Management</h4>
                            <p>
                                A doctor dashboard allows doctors to manage their patients, appointments, and practice operations in one central location, saving time and energy.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <RiUserHeartLine />
                            </div>
                            <h4>Improved Patient Care</h4>
                            <p>
                                With features such as electronic health records, prescription management, and appointment scheduling, a doctor dashboard allows doctors to access patient information quickly and easily, which can lead to improved patient care.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <AiOutlineLineChart />
                            </div>
                            <h4>Increased Productivity</h4>
                            <p>
                                A doctor dashboard streamlines practice management and reduces administrative tasks, allowing doctors to focus on providing high-quality care for their patients.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <BsShieldCheck />
                            </div>
                            <h4>Improved Data Security</h4>
                            <p>
                                A doctor dashboard can include security features to protect patient data and meet compliance regulations.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <BsClipboardData />
                            </div>
                            <h4>Easy Access to Patient Data</h4>
                            <p>
                                A doctor dashboard provides a centralized location for storing and accessing patient data, making it easy for doctors to review patient information and track progress.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <AiOutlineFieldTime />
                            </div>
                            <h4>Time-Saving</h4>
                            <p>
                                A doctor dashboard allows doctors to automate many administrative tasks, such as appointment scheduling and prescription refills, which can save a significant amount of time.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="my-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex align-items-center mt-3">
                        <div className="home-description pe-3">
                            <h2>Easy to use & User-Friendly</h2>
                            <p>
                                Our doctor dashboard is designed with ease of use in mind. The interface is intuitive and user-friendly, making it simple for medical professionals to navigate and access the features they need. With clear and concise instructions, even those with limited computer experience can quickly learn how to use the dashboard. The platform is also optimized for mobile use, so you can access your patients' information and manage your practice on-the-go. We understand that medical professionals have a lot on their plate, so we made sure that our doctor dashboard is easy to use, allowing you to focus on what really matters: providing excellent care for your patients.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-3 d-flex align-items-center">
                        <img src="../../assets/img/easy-to-use.jpg" className="img-fluid rounded" alt="" />
                    </div>
                </div>
            </div>
        </section>

        <section className="my-5" id="pricing">

            <h2 className="section-headline text-center mb-4">Choose the Right Plan for Your</h2>

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

        <br />

        <Footer />

    </div>
  )
}

export default Home