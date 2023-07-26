import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Faq = () => {
    document.title = 'FAQ - DocNek'
  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">FAQs</h2>

            <div className="section-line"></div>

            <div className="container">

                <p className="contact-par mb-5">
                    Find the Answers You're Looking For in Our FAQs
                </p>

                <div className="col-lg-10 m-auto">

                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item faq-accordion">
                            <h2 className="accordion-header" id="flush-headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                            >
                                How does the dashboard work?
                            </button>
                            </h2>
                            <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    DOCNEK is an online platform that allows you to manage patient information, appointment scheduling, prescription management, and financial management. You can access the dashboard from any device with an internet connection, making it easy to manage your practice from anywhere.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item faq-accordion">
                            <h2 className="accordion-header" id="flush-headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo"
                                aria-expanded="false"
                                aria-controls="flush-collapseTwo"
                            >
                                Can I try the dashboard before purchasing?
                            </button>
                            </h2>
                            <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Yes, we offer a 7 days free trial of the dashboard, so you can see how it works and decide if it's the right solution for your practice.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item faq-accordion">
                            <h2 className="accordion-header" id="flush-headingThree">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree"
                                aria-expanded="false"
                                aria-controls="flush-collapseThree"
                            >
                                Are there any additional costs?
                            </button>
                            </h2>
                            <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    No, there are no additional costs. Our pricing plans include everything you need to use the dashboard, including updates and customer support.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item faq-accordion">
                            <h2 className="accordion-header" id="flush-headingFour">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFour"
                                aria-expanded="false"
                                aria-controls="flush-collapseFour"
                            >
                                Can I access the dashboard on mobile?
                            </button>
                            </h2>
                            <div
                            id="flush-collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingFour"
                            data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Yes, the dashboard can be accessed from both desktop and mobile devices, allowing you to manage your patients and appointments from anywhere, at any time.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item faq-accordion">
                            <h2 className="accordion-header" id="flush-headingFive">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseFive"
                                aria-expanded="false"
                                aria-controls="flush-collapseFive"
                            >
                                Is the dashboard secure
                            </button>
                            </h2>
                            <div
                            id="flush-collapseFive"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingFive"
                            data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Yes, the dashboard is built with security and compliance in mind. It is designed to meet all relevant regulations and standards.
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>

        <br />

        <Footer />

    </div>
  )
}

export default Faq