import { useEffect, useState, useRef } from "react"
import ItemMessage from "../components/ItemMessage"
import ItemContact from "../components/ItemContact"
const PrincipalPage = () => {
    const [result, setResult] = useState([])
    const inputMessageRef = useRef(null)
    const inputSecondsRef = useRef(null)
    const inputRecipientRef = useRef(null)
    const URL = 'http://localhost:8080/api/'
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                const messages = await fetch(`${URL}messages`, {
                    method:'GET',
                    headers:{
                        'Content-Type': "application/json"
                    }
                });
                const {payload} = await messages.json();
                setResult([...payload])
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchMessages()
    },[])
    const changeState=async()=>{
        if (inputMessageRef.current && inputRecipientRef.current && inputSecondsRef.current){
            try{
                const promise = await fetch(`${URL}messages`, {
                method:'POST',
                body: JSON.stringify({
                    description: inputMessageRef.current.value,
                    send_at: inputSecondsRef.current.value,
                    recipient: inputRecipientRef.current.value
                }),
                headers:{
                    'Content-Type': "application/json"
                }
                })
                const json = await promise.json()
                console.log(json)
                setResult([...result, json])
                }catch(error){
                    console.log(error.message)
                }
        }else{
            console.log('jajaj malll')
        }
    }
    return (
    <>
        <section className="mainContent">
            <h1>CHATBOT WHATSAPP</h1>
            <div>
                <input placeholder="mensaje" ref={inputMessageRef}></input>
                <input type="number" min={1} max={60} ref={inputSecondsRef}></input>
                <input placeholder="numero" ref={inputRecipientRef}></input>
            </div>
            <div><button onClick={()=> changeState()}>enviar</button></div>
            <h2>ultimos mensajes enviados:</h2>
            <ul className="containerMessages">
                {
                    result.map(r=><ItemMessage key={r._id} description={r.description} created_at={r.created_at} recipient={r.recipient} />)
                }
            </ul>
        </section>
    </>
    )
}

export default PrincipalPage
