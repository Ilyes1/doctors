import React, { useRef, useState } from 'react';
import Footer from '../components/Footer'
import Header from '../components/Header'
import emailjs from 'emailjs-com'

const Contact = () => {

    document.title = 'Contact Us - DocNek'

    const form = useRef();

    const [message, setMessage] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_paen0uh', 'template_l0046hf', form.current, 'zOlHZKaL978EzJue6')
          .then((result) => {
              setMessage(true)
              setTimeout(() => {
                  setMessage(false)
              }, 3000);
          }, (error) => {
              console.log(error.text);
          });
      };

  return (
    <div>
        
        <Header />

        <br />

        <section className="pt-5 my-5">

            <h2 className="section-title text-center mb-4">Get in Touch</h2>

            <div className="section-line"></div>

            <div className="container">

                <p className="contact-par">
                    If you have any questions about our doctor dashboard or need assistance, please don't hesitate to contact us.
                </p>

                <div className="row mt-4">
                    <div className="col-lg-6 mt-4 d-flex align-items-center">
                        <form className="contact-form" ref={form} onSubmit={sendEmail}>
                            <input type="text" placeholder="Full name" className="mt-0" name='name' required/>
                            <input type="email" placeholder="Email address" name='email' required/>
                            <textarea placeholder="Your message" name='message' required></textarea>
                            <h6 className={`text-success success-msg mt-2 ${message && 'active'}`}>Message sent successfully!</h6>
                            <button className="outline-btn w-50 mt-3 text-primary">Send</button>
                        </form>
                    </div>
                    <div className="col-lg-6 mt-4">
                        <div className="p-4">
                            <img src="../../assets/img/contact.jpg" className="img-fluid rounded shadow" alt="" />
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

export default Contact