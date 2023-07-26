import React, { useRef, useState } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import emailjs from 'emailjs-com'

const Feedback = () => {

    document.title = 'Your Opinion matters - DocNek'

    const form = useRef();

    const [message, setMessage] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_paen0uh', 'template_l0046hf', form.current, 'zOlHZKaL978EzJue6')
          .then((result) => {
              setMessage(true)
              setTimeout(() => {
                  setMessage(false)
              }, 5000);
          }, (error) => {
              console.log(error.text);
          });
      };

  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-headline text-center mb-4">Feedback</h2>

            <div className="section-line"></div>

            <div className="container">

                <p className="contact-par">
                    We want to hear from you! Help us improve with your feedback
                </p>

                <div className="row mt-4">
                    <div className="col-lg-6 mt-4 d-flex align-items-center">
                        <form className="contact-form" ref={form} onSubmit={sendEmail}>
                            <input type="text" placeholder="Full name" className="mt-0" name='name' required/>
                            <input type="email" placeholder="Email address" name='email' required/>
                            <textarea placeholder="Your message" name='message' required></textarea>
                            <h6 className={`text-success success-msg mt-2 ${message && 'active'}`}>Your feedback is greatly appreciated! We will take your comments into consideration</h6>
                            <button className="outline-btn w-50 mt-3 text-primary">Send</button>
                        </form>
                    </div>
                    <div className="col-lg-6 mt-4">
                        <div className="p-4">
                            <img src="../../assets/img/feedback.jpg" className="img-fluid rounded shadow" alt="" />
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

export default Feedback