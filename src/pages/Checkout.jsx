import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { child, get, ref, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dbs } from '../firebase'

const Checkout = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);
    const navigate = useNavigate()

    const [plan, setPlan] = useState(1)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {
            if (snapshot.val().notifications !== undefined) {
                setNotifications(snapshot.val().notifications)
            } else {

            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (notifications.length) {
            update(userDoc, {
                notifications: notifications
            })
        }
    }, [notifications])

    const handlePush = () => {
        const date = new Date().getTime()
        setNotifications([{
            text: 'Your subscription started',
            date: date
        }, ...notifications])
    }

  return (
    <div className='container-fluid signup'>
        <div className="row h-100">
            <div className="col-lg-8 h-100 signup-left d-flex align-items-center justify-content-center">
                <div className="col-lg-10 my-5">
                    <Link to={'/'} className='auth-logo mb-5 d-block'>
                        <img src="../../assets/img/logo.svg" alt="" />
                    </Link>
                    <h3 className='mb-3'>Don't Miss Out - Subscribe Now!</h3>
                    <p className='mb-2'>
                        Welcome to DocNek! We are excited to have you join us.
                    </p>
                    <p className='mb-4'>
                        Subscribe now and get instant access to all of our amazing features! With your subscription, you will be the first to know when an exciting new feature launches.
                    </p>
                    <div className="shadow rounded-3 p-3">
                        <div className="plan-tabs">
                            <button className={plan === 1 && 'active'} onClick={() => setPlan(1)}>Monthly</button>
                            <button className={plan === 2 && 'active'} onClick={() => setPlan(2)}>Yearly</button>
                        </div>
                        {
                            plan === 1 && (
                                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, vault: true }}>
                                    <PayPalButtons 
                                        style={{ 
                                            shape: 'rect',
                                            color: 'blue',
                                            layout: 'vertical',
                                            label: 'subscribe'
                                        }} 
                                        createSubscription = {(data, actions) => {
                                            return actions.subscription.create({
                                                /* Creates the subscription */
                                                plan_id: 'P-23S5135543527543YMP2INQY'
                                            })
                                        }}
                                        onApprove = {(data, actions) => {
                                            update(userDoc, {
                                                subscribed: true
                                            }).then(() => {
                                                navigate('/thankYou')
                                                handlePush()
                                            })
                                            // alert(data.subscriptionID);
                                        }}
                                        />
                                </PayPalScriptProvider>
                            )
                        }
                        {
                            plan === 2 && (
                                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, vault: true }}>
                                    <PayPalButtons 
                                        style={{ 
                                            shape: 'rect',
                                            color: 'blue',
                                            layout: 'vertical',
                                            label: 'subscribe'
                                        }} 
                                        createSubscription = {(data, actions) => {
                                            return actions.subscription.create({
                                                /* Creates the subscription */
                                                plan_id: 'P-3XY48036GE7285620MP2NL2Y'
                                            })
                                        }}
                                        onApprove = {(data, actions) => {
                                            update(userDoc, {
                                                subscribed: true
                                            }).then(() => {
                                                navigate('/thankYou')
                                                handlePush()
                                            })
                                            // alert(data.subscriptionID);
                                        }}
                                        />
                                </PayPalScriptProvider>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="col-lg-4 pe-0 h-100 signup-img d-none d-lg-block">
                <img src='../../assets/img/signup.jpg' alt="" />
            </div>
        </div>
    </div>
  )
}

export default Checkout