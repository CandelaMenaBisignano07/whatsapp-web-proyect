import React, { useEffect, useState, useRef } from 'react'
import ItemContact from './ItemContact'
const SideBar = () => {
    const inputSearchRef = useRef('')
    const [contacts, setContacts] = useState([])
    const [contactsUptade, setContactsUptade] = useState([])
    const URL = 'http://localhost:8080/api/'
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        const fetchContacts = async()=>{
            try {
                const contactsFetch = await fetch(`${URL}messages/contacts`, {
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
        fetchContacts()

        return ()=>{
            if(contacts) abortController.abort()
        }
    }, [])
    const searchContacts = (input)=>{
        if(!input) return console.log('no se puso nada')
        const contactsResults = contacts.filter((c)=> c.name.toLowerCase().includes(input.toLowerCase()))
        setContactsUptade([...contactsResults])
    };
    return (
    <>
        <header className="sideBar">
            <nav>
                <a className="primero" href='/'>inicio</a>
                <div className="inputContainer">
                    <img src="/img/Lupa.png" onClick={()=> searchContacts(inputSearchRef.current.value)}/>
                    <input type="search" placeholder="buscar" ref={inputSearchRef}/>
                </div>
                <div className="containerContacts">
                    {
                        contactsUptade.map(c=><ItemContact key={c.id.user} name={c.name} contactId={c.id._serialized}/>)
                    }
                </div>
            </nav>
        </header>
    </>
  )
}

export default SideBar
