import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const About = () => {
    document.title = 'About Us - DocNek'
  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">About Us</h2>

            <div className="section-line mb-5"></div>

            <div className="container">

                <div className="col-lg-10 m-auto">

                    <p className='about-par'>
                        Welcome to DOCNEK, a comprehensive solution designed to streamline the daily operations of your medical practice. Our goal is to provide an easy-to-use platform that simplifies the management of patient records, appointment scheduling, prescription management and more.
                    </p>

                    <p className='about-par'>
                        We have used our experience to create a solution that addresses the unique needs of medical practices. Our dashboard allows you to manage your patient information and appointments with ease, while also providing powerful tools for financial management and analytics.
                    </p>

                    <p className='about-par'>
                        We understand the importance of security and privacy in the healthcare industry, that's why we use the latest technologies to ensure your data is safe and secure.
                    </p>

                    <p className='about-par'>
                        We are dedicated to providing the best customer service possible and are always looking for ways to improve our platform. If you have any questions or suggestions, please don't hesitate to <Link to={'/contact'}>contact us</Link>. We are here to help you take your practice to the next level.
                    </p>

                    <p className='about-par'>
                        Thank you for choosing our doctor dashboard. We look forward to working with you.    
                    </p>

                </div>

            </div>
        </section>

        <br />

        <Footer />

    </div>
  )
}

export default About