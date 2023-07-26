import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const PrivacyPolicy = () => {

    document.title = 'Privacy Policy - DocNek'

  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">Privacy Policy</h2>

            <div className="section-line mb-5"></div>

            <div className="container">

                <div className="col-lg-10 m-auto">

                    <p className='about-par'>
                        At DOCNEK, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website and services, and how you can manage your personal information.
                    </p>

                    <h5 className="about-headline">Information Collection and Use:</h5>

                    <ul className='about-par'>
                        <li>
                            We collect personal information from you when you use our website, sign up for an account, or make a purchase. This information may include your name and contact information.
                        </li>
                        <li>
                            We use this information to provide you with our services, and communicate with you.
                        </li>
                        <li>
                            We may also use your personal information for internal research and analysis, to improve our services and website, and to personalize your experience.
                        </li>
                    </ul>

                    <h5 className="about-headline">Disclosure of Personal Information:</h5>

                    <ul className='about-par'>
                        <li>
                            We may share your personal information with service providers who assist us in providing our services
                        </li>
                    </ul>

                    <h5 className="about-headline">Security:</h5>

                    <ul className='about-par'>
                        <li>
                            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
                        </li>
                        <li>
                            We use industry-standard encryption and other security measures to protect your personal information.
                        </li>
                    </ul>

                    <h5 className='about-headline'>Cookies:</h5>

                    <ul className="about-par">
                        <li>
                            We use cookies to improve your experience on our website and to personalize your experience.
                        </li>
                        <li>
                            You can choose to disable cookies in your browser settings, but please note that this may affect your ability to use some features of our website.
                        </li>
                    </ul>

                    <h5 className='about-headline'>Your Rights:</h5>

                    <ul className='about-par'>
                        <li>
                            You have the right to access, correct, or delete your personal information.
                        </li>
                        <li>
                            You can also request to receive an exported file of your personal information or request that we transfer your personal information to another service provider.
                        </li>
                        <li>
                            If you have any concerns or questions about our Privacy Policy, please contact us at <a href="mailto:contact@name.com">contact@name.com</a>.
                        </li>
                    </ul>

                    <h5 className='about-headline'>Updates to this Privacy Policy:</h5>

                    <ul className="about-par">
                        <li>
                            We may update this Privacy Policy from time to time to reflect changes in our services or to comply with legal requirements.
                        </li>
                    </ul>

                    <p className='about-par'>
                        By using our website and services, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.
                    </p>

                    <p className='about-par'>
                        Last updated: 1-28-2023
                    </p>

                </div>

            </div>
        </section>

        <br />

        <Footer />

    </div>
  )
}

export default PrivacyPolicy