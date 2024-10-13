import React, { useEffect, useState, useRef, useContext } from 'react'
import ItemContact from './LinkToContact'
import { Link } from 'react-router-dom'
import ItemListContactsSideBar from '../itemLists/ItemListContactsSideBar'
import { ClientContext } from '../context/ClientContext'
const SideBar = () => {
    const [contacts, setContacts] = useState([])
    const [contactsUptade, setContactsUptade] = useState([])
    const [input, setInput] = useState('')
    const {socket} = useContext(ClientContext)
    const URL = 'http://localhost:8080/api/'
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        const fetchContacts = async()=>{
            try {
                const contactsFetch = await fetch(`${URL}contacts`, {
                    method:'GET',
                    headers:{
                        'Content-Type': "application/json"
                    },
                    signal:signal
                })
                const {payload:payload2} = await contactsFetch.json();
                const mapedContacts = payload2.map(c => {return {id:c.id, name:c.name}})
                setContacts([...mapedContacts]);
                setContactsUptade([...mapedContacts]);
            } catch (error) {
                console.log(error.name, error.message)
            }
        };

        socket.on('messageRecieved', (client_message)=>{
            fetchContacts()
        })

        socket.on('messageSended', (client_message)=>{
            fetchContacts()
        })
        fetchContacts()
        return ()=>{
            socket.off('messageRecieved')
            socket.off('messageSended')
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
                <Link to='/home' className='homeAnchor'>inicio</Link>
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
