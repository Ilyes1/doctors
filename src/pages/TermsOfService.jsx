import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const TermsOfService = () => {

    document.title = 'Terms of Service - DocNek'

  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">Terms of Service</h2>

            <div className="section-line mb-5"></div>

            <div className="container">

                <div className="col-lg-10 m-auto">

                    <h5 className="about-headline">Services Provided:</h5>

                    <p className="about-par">
                        DOCNEK is an online platform that provides medical professionals with secure access to patient information, appointment scheduling, and other medical tools.
                    </p>
                    <h5 className="about-headline">Acceptable Use Policy:</h5>

                    <p className="about-par">
                        You agree to use the Platform only for lawful purposes and in accordance with these Terms of Service. You shall not upload or transmit any viruses, malware, or other harmful code, nor shall you use the platform to engage in any unauthorized or illegal activity.
                    </p>
                    <h5 className="about-headline">Ownership and Intellectual Property Rights:</h5>

                    <p className="about-par">
                        All content and technology on the platform is the exclusive property of DOCNEK and is protected by applicable intellectual property laws.
                    </p>
                    <h5 className="about-headline">User Representation and Warranty:</h5>

                    <p className="about-par">
                        You represent and warrant that you are authorized to use the platform and that you will use it in compliance with all applicable laardws.
                    </p>
                    <h5 className="about-headline">Confidentiality and Data Security:</h5>

                    <p className="about-par">
                        You acknowledge and agree that patient information accessible through the Dashboard is confidential and shall be used only in accordance with applicable laws and ethical standards. You are responsible for maintaining the confidentiality and security of your login credentials.
                    </p>
                    <h5 className="about-headline">Limitation of Liability:</h5>

                    <p className="about-par">
                        DOCNEK shall not be liable for any damages arising from your use of the platform or from any errors or inaccuracies in the platform.
                    </p>
                    <h5 className="about-headline">Changes to Terms of Service:</h5>

                    <p className="about-par">
                        DOCNEK reserves the right to modify these Terms of Service at any time, and your continued use of the Doctor Dashboard constitutes acceptance of any such changes.
                    </p>
                    <h5 className="about-headline">Termination and Cancellation:</h5>
 
                    <p className="about-par">
                        DOCNEK reserves the right to terminate or cancel your access to the Doctor Dashboard at any time, with or without cause.
                    </p>

                    <p className="about-par">
                        By accessing and using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>

                </div>

            </div>
        </section>

        <br />

        <Footer />

    </div>
  )
}

export default TermsOfService