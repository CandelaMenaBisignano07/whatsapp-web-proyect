import { useContext} from 'react'
import Button from "../components/Button"
import ItemMessagesContact from '../Items/ItemMessagesContact'
import { ClientContext } from '../context/ClientContext'
import { redirect, useNavigate } from 'react-router-dom';
const ItemListContacts = ({data}) => {
    const dateDifference = (message)=>{
        const TIME_LIMIT_MS = (23 * 60 * 60 + 58 * 60 + 0) * 1000;
        console.log(TIME_LIMIT_MS)
        const now = Date.now();
        const messageTimestampMs = message.created_at * 1000;
        const timeDifference = now - messageTimestampMs;
        return timeDifference <= TIME_LIMIT_MS ? true : false
    }
    const {URL, setError} = useContext(ClientContext);
    const navigate = useNavigate()
    const eliminateMessage = async(id)=>{
        try {
            const hola = await fetch(`${URL}messages/${id}`,{
                method:'DELETE', 
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            if(hola.status != 200){
                const {error: errorMessage} = await hola.json()
                setError({code:hola.status, message: errorMessage})
                return navigate(`/error/${hola.status}`)
            }
        } catch (error) {
            if(error.message === 'signal is aborted without reason'){
                return
            }  
            else console.log(error.message)
        }
    }
    return (
    <>
        <ul className='messagesContactContainer'>
            {data.messages.length > 0 ? (
                data.messages.map((msg) => (
                    <>
                        {
                            msg.id.fromMe && msg.type != 'revoked' ? (
                            <div className='containerMessageContact' key={msg.id.id}>
                                <div className='messageContact'>
                                    {
                                        dateDifference(msg) ? <Button body={'eliminar'} callback={eliminateMessage} id={msg.id._serialized}/> : null
                                    }
                                    <ItemMessagesContact message={msg}/>
                                </div>
                            </div>
                        ) : 
                        (data.isGroup ? (
                            <div className='containerMessageOthers' key={msg.id.id}>
                                <div className='profilePictureContainer'>
                                    <img src={msg.profilePicture}/>
                                </div>
                                <ItemMessagesContact message={msg}/>
                            </div>) 
                            : <ItemMessagesContact message={msg} key={msg.id.id}/>
                        )
                        }
                    </>
                ))
            ) : (
                <p>No messages available</p>
            )}
        </ul>
    </>
    )
}

export default ItemListContacts
