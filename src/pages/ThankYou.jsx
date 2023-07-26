import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {

  return (
    <div className='container-fluid signup'>
        <div className="row h-100">
            <div className="col-lg-8 h-100 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10 my-5">
                    <Link to={'/'} className='auth-logo mb-5 d-block'>
                        <img src="../../assets/img/logo.svg" alt="" />
                    </Link>
                    <h3 className='mb-3'>Thank You!</h3>
                    <p className='mb-2'>
                        Thank you for subscribing to our service! We are thrilled to have you on board and can't wait for you to start enjoying all the benefits that come with your subscription
                    </p>
                    <p className='mb-4'>
                        If you ever need assistance with anything, please don't hesitate to reach out to us. We are always here to help and are dedicated to making your experience with our service as smooth and enjoyable as possible.
                    </p>
                    <Link to={'/dashboard/panel'} className='primary-btn mb-4'>Get Started</Link>
                    <p>
                        Thank you again for choosing our dashboard!
                    </p>
                </div>
            </div>
            <div className="col-lg-4 pe-0 h-100 signup-img d-none d-lg-block">
                <img src='../../assets/img/signup.jpg' alt="" />
            </div>
        </div>
    </div>
  )
}

export default ThankYou