import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Help = () => {
    document.title = 'Help - DocNek'
  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">Help</h2>

            <div className="section-line mb-5"></div>

            <div className="container">

                <div className="col-lg-10 m-auto">

                    <p className='about-par'>
                        The help section of our website will provide you with the information and resources you need to get the most out of your doctor dashboard experience. Here you will find answers to common questions, and other helpful resources.
                    </p>

                    <p className='about-par'>
                        If you can't find what you're looking for in our help section, you can also contact our customer support for assistance. We are available to answer your questions and help you with any issues you may be experiencing.
                    </p>

                    <p className='about-par'>
                        To contact our customer support team, you can email us at <a href="mailto:support@docnek.com">docnekcontact@gmail.com</a>, or use the <Link to={'/contact'}>contact</Link> page on our website. We will respond to your inquiry as quickly as possible.
                    </p>

                    <p className='about-par'>
                        You can also find answers to many of your questions by browsing through our <Link to={'/faq'}>FAQ</Link> page. Here, you will find information that will help you.
                    </p>

                    <p className='about-par'>
                        We strive to make your experience with the doctor dashboard as smooth as possible, and we are always happy to help.  
                    </p>

                </div>

            </div>
        </section>

        <br />

        <Footer />

    </div>
  )
}

export default Help