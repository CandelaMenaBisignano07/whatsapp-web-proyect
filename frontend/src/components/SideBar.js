import React, { useEffect, useState, useContext } from 'react'
import ItemListContactsSideBar from '../itemLists/ItemListContactsSideBar'
import { ClientContext } from '../context/ClientContext'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { api } from '../lib/api/api'
const SideBar = () => {
    const [contacts, setContacts] = useState([])
    const [contactsUptade, setContactsUptade] = useState([])
    const [input, setInput] = useState('')
    const {socket, setError} = useContext(ClientContext)
    const navigate = useNavigate();
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal;
        api.contacts.fetchContacts(setError, navigate, signal, setContacts, setContactsUptade);
        const recievedEvent = socket.on('messageRecieved', ()=>{
            api.contacts.fetchContacts(setError, navigate, signal, setContacts, setContactsUptade);
        })

        const sendedEvent = socket.on('messageSended', ()=>{
            api.contacts.fetchContacts(setError, navigate, signal, setContacts, setContactsUptade);
        })
        return ()=>{
            socket.off('messageRecieved', recievedEvent)
            socket.off('messageSended', sendedEvent)
            abortController.abort()
        }
    }, [])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            const contactsResults = contacts.filter((c)=>{
                return c.name.toLowerCase().includes(input.toLowerCase())
            })
            setContactsUptade([...contactsResults])
        }, 1000)

        return()=>{
            clearTimeout(timer)
        }
    }, [input, contacts])

    const searchContacts = (query)=> setInput(query)
    return (
    <>
        <header className="sideBar">
            <nav>
                <div>
                    <Link to='/home' className='homeAnchor'>inicio</Link>
                    <Button body={'log out'} callback={api.contacts.destroyClient} params={[setError, navigate, socket]}/>
                </div>
                <div className="inputContainer">
                    <input value={input} type="search" placeholder="buscar" onChange={(e)=>searchContacts(e.currentTarget.value)}/>
                </div>
                <ItemListContactsSideBar data={contactsUptade}/>
            </nav>
        </header>
    </>
  )
}

export default SideBar
