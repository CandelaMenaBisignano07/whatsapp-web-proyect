import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemMessagesContact from '../components/ItemMessagesContact'
//import ItemMessagesContact from '../components/ItemMessagesContact'
//problema puede ser que hayan muchas imagenes que cargar

const ContactPage = () => {
    const {contactId} = useParams()
    const [contact, setContact] = useState(null)
    const URL = 'http://localhost:8080/api/'
    useEffect(()=>{
        console.log(contactId)
        const abortController = new AbortController()
        const signal = abortController.signal
        const fetchContact = async()=>{
            try {
                console.log('hola estoy llamando 2 veces')
                const contactFetch = await fetch(`${URL}messages/contacts/${contactId}`, {
                    method:'GET', 
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    signal: signal
                });
                console.log(contactFetch.status)
                const {payload: contactFetched} = await contactFetch.json()
                console.log(contactFetched)
                const profilePictureFetch = await fetch(`${URL}messages/${contactFetched.id._serialized}`,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    signal:signal
                })
                const {payload: profilePicture} = await profilePictureFetch.json()
                if (profilePicture == undefined){
                    setContact({...contactFetched, profile_picture:'./img/whatsapp_default_image.jpeg'})
                }
                setContact({...contactFetched, profile_picture: profilePicture})
                console.log(contact)
            } catch (error) {
                console.log(error.message)
            }
        }
            fetchContact()

        return()=>{
            if(!contact) abortController.abort()
        };
        
    }, [contactId])
    if(!contact) return <div>...loading</div>
    else console.log(contact)
  return (
    <>
    <section className='contactContainer'>
        <header className='contactHeader'>
            <img src={contact.profile_picture}/>
            <h2>{contact.name}</h2>
        </header>
        <section className='messagesContactContainerWrapper'>
        <div className='messagesContactContainer'>
            {contact.messages.length > 0 ? (
                    contact.messages.map((msg) => (
                        <ItemMessagesContact message={msg} key={msg.id.id}/>
                    ))
                ) : (
                    <p>No messages available</p>
                )}
        </div>
        </section>
    </section>
    </>
  )
}

export default ContactPage
