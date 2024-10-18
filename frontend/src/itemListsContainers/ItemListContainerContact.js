import React, { useContext, useState, useEffect } from 'react'
import { ClientContext } from '../context/ClientContext'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import ItemListContacts from '../itemLists/ItemListContacts'
import SideBar from '../components/SideBar'
import { fetchContact } from '../api/contactsApi'
const ItemListContainerContacts = () => {
    const {contactId} = useParams()
    const [contact, setContact] = useState(null)
    const [loader, setLoader] = useState(true)
    const {socket} = useContext(ClientContext)
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        
        socket.on('messageRecieved', (client_message)=>{
            if(client_message.from === contactId) fetchContact(signal, contactId, setContact)
        })

        socket.on('messageSended', (client_message)=>{
            if(client_message.to === contactId) fetchContact(signal, contactId, setContact)
        })

        socket.on('revokedMessage', (revoked_message)=>{
            if(revoked_message.to == contactId) fetchContact(abortController.signal, contactId, setContact)
        })

        fetchContact(signal, contactId, setContact)
        setLoader(false)
        return()=>{
            socket.off('messageRecieved')
            socket.off('messageSended')
            socket.off('revokedMessage') //agregamos esto
            abortController.abort()
        };
        
    }, [contactId])
    if(!contact) return <Loader/>  // falta el loader con el estado
  return (
    <div className='containerGrid'>
        <SideBar/>
        <section className='contactContainer'>
            <header className='contactHeader'>
                <img src={contact.profile_picture}/>
                <h2>{contact.name}</h2>
            </header>
            <section className='messagesContactContainerWrapper'>
                <ItemListContacts data={contact}/>
            </section>
        </section>
    </div>
  )
}

export default ItemListContainerContacts