import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import { ref, set, onChildAdded } from "firebase/database";
import { useEffect } from 'react';
import { useState } from 'react';

const Preview = () => {

    const { user } = useParams()

    const [name, setName] = useState('')
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onChildAdded(ref(db, 'users'), snapshot => {
            if (snapshot.val().username == user) {
                setName(snapshot.val().name)
                setLinks(JSON.parse(snapshot.val().links))
                setLoading(false)
            } else {

            }
        })
    }, [])

  return (
    <div className='preview'>
        {
            loading ? (
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            ) : (
                <div className="col-lg-6 col-md-10 m-auto preview-links my-5">
                    <h1 className='text-center mb-4'>{name}</h1>
                    <Link to={''}>Promo Rates</Link>
                    <h5 className='mb-2 mt-4 text-center text-secondary'>Links</h5>
                    {
                        links.map(link => (<a href={link.link} target='blank'>{link.title}</a>))
                    }
                </div>
            )
        }
    </div>
  )
}

export default Preview