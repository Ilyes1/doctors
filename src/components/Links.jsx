import React, { useState } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { db } from '../firebase'
import { getAuth, onAuthStateChanged, reauthenticateWithCredential } from "firebase/auth";
import { ref, set, child, get, update } from "firebase/database";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Links = () => {

    const auth = getAuth();

    const navigate = useNavigate()

    const [newTitle, setNewTitle] = useState('')
    const [newLink, setNewLink] = useState('')

    const [links, setLinks] = useState([])

    const [kk, setKk] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                get(child(ref(db, 'users'), user.uid)).then(snapshot => {
                    setLinks(JSON.parse(snapshot.val().links))
                })
                setKk(user.uid)
              // ...
            } else {
              navigate('/')
            }
          });
    }, [])


    useEffect(() => {
        if (links.length > 0) {
            update(child(ref(db, 'users'), kk), {
                links: JSON.stringify(links)
            })
        } else {}
    }, [links])


  return (
    <div className='container'>
        
        <h2 className='my-4 d-flex align-items-center justify-content-between'>
            Your Links
            <button className='new-link-btn' data-bs-toggle="modal" data-bs-target="#newLinkModal">New Link</button>
        </h2>

        {
            links.map((link, index) => (
                <div className="link-item shadow mb-4" key={index}>
                    <div className="link-item-left">
                        <p>{link.title}</p>
                        <span>{link.link}</span>
                    </div>
                    <div className="link-item-right bg-danger" onClick={() => setLinks(links.filter((link, i) => i !== index))}>
                        <CiCircleRemove />
                    </div>
                </div>
            ))
        }

        <div className="modal fade" id="newLinkModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Link</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="form-group new-link-input mb-3">
                        <label className='form-label'>Title</label>
                        <input type="text" onChange={(e) => setNewTitle(e.target.value)} />
                    </div>
                    <div className="form-group new-link-input mb-3">
                        <label className='form-label'>Link</label>
                        <input type="text" onChange={(e) => setNewLink(e.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="close-modal" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="new-link-submit" onClick={() => setLinks([{title: newTitle, link: newLink}, ...links])}>Add Link</button>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Links