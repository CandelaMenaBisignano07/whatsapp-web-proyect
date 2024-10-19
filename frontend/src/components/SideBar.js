import React, { useEffect, useState, useRef, useContext } from 'react'
import ItemListContactsSideBar from '../itemLists/ItemListContactsSideBar'
import { ClientContext } from '../context/ClientContext'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
const SideBar = () => {
    const [contacts, setContacts] = useState([])
    const [contactsUptade, setContactsUptade] = useState([])
    const [input, setInput] = useState('')
    const {socket, setError} = useContext(ClientContext)
    const URL = 'http://localhost:8080/api/';
    const navigate = useNavigate();
    const destroyClient = async()=>{
        try {
            const clientDestroy = await fetch(`${URL}contacts`, {
                method:'delete',
                headers:{
                    'Content-type': 'application/json'
                }
            })

            if(clientDestroy.status != 200){
                const {error: errorMessage} = await clientDestroy.json();
                setError({code: clientDestroy.status, message: errorMessage})
                return navigate(`/error/${clientDestroy.status}`)
            }
            localStorage.setItem('client', "")
            return navigate('/loggedOut')
        } catch (error) {
            if(error.message === 'signal is aborted without reason'){
                return
            }  
            else console.log(error.message)
        }
    }
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal;
        const fetchContacts = async()=>{
            console.log('jaa')
            try {
                const contactsFetch = await fetch(`${URL}contacts`, {
                    method:'GET',
                    headers:{
                        'Content-Type': "application/json"
                    },
                    signal:signal
                })
                console.log(contactsFetch.status)
                if(contactsFetch.status != 200){
                    const {error: errorMessage} = await contactsFetch.json();
                    setError({code: contactsFetch.status, message: errorMessage})
                    return navigate(`/error/${contactsFetch.status}`)
                }
                const {payload:payload2} = await contactsFetch.json();
                console.log(payload2, 'hola')
                const mappedContacts = payload2.map((c)=> {return{id:c.id, name:c.name}})
                setContacts(mappedContacts);
                setContactsUptade(mappedContacts);
                console.log('setted')
            } catch (error) {
                if(error.message === 'signal is aborted without reason'){
                    return
                }  
                else console.log(error.message)
            }
        };
        fetchContacts()
        const recievedEvent = socket.on('messageRecieved', ()=>{
            fetchContacts()
        })

        const sendedEvent = socket.on('messageSended', ()=>{
            fetchContacts()
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
                    <Button body={'log out'} callback={destroyClient}/>
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
