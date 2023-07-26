import React from 'react'
import { Link } from 'react-router-dom'

const TrialEnded = () => {

  return (
    <div className='container-fluid signup'>
        <div className="row h-100">
            <div className="col-lg-8 h-100 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10 my-5">
                    <Link to={'/'} className='auth-logo mb-5 d-block'>
                        <img src="../../assets/img/logo.svg" alt="" />
                    </Link>
                    <h3 className='mb-3'>Sorry, your trial period has ended.</h3>
                    <p className='mb-5'>We hope you enjoyed using our dashboard! To continue, please subscribe to a paid plan.</p>
                    <Link to={'/pricing'} className='primary-btn'>Subscribe Now</Link>
                </div>
            </div>
            <div className="col-lg-4 pe-0 h-100 signup-img d-none d-lg-block">
                <img src='../../assets/img/signup.jpg' alt="" />
            </div>
        </div>
    </div>
  )
}

export default TrialEnded