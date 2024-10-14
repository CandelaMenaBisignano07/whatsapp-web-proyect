import { useContext} from 'react'
import Button from '../components/Button'
import ItemMessagesContact from '../Items/ItemMessagesContact'
import { ClientContext } from '../context/ClientContext'
const ItemListContacts = ({data}) => {
    const {URL} = useContext(ClientContext);
    const eliminateMessage = async(id)=>{
        try {
            await fetch(`${URL}messages/${id}`,{
                method:'DELETE', 
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log(error.message)
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
                                    <Button body={'eliminar'} callback={eliminateMessage} id={msg.id._serialized}/>
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
