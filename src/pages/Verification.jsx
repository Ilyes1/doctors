import { child, ref, update } from 'firebase/database';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { dbs } from '../firebase';

const Verification = () => {

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);
    const navigate = useNavigate()

    useEffect(() => {
        update(userDoc, {
            subscribed: true
        }).then(() => navigate('/dashboard/panel'))
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Verification