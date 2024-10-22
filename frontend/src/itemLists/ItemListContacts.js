import { useContext} from 'react'
import Button from "../components/Button"
import ItemMessagesContact from '../Items/ItemMessagesContact'
import { ClientContext } from '../context/ClientContext'
import { useNavigate } from 'react-router-dom';
import { dateDifference } from '../utils/utils';
import { api } from '../lib/api/api';
const ItemListContacts = ({data}) => {
    const {setError} = useContext(ClientContext);
    const navigate = useNavigate()
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
                                        dateDifference(msg) ? <Button body={'eliminar'} callback={api.messages.deleteMessage} params={[msg.id._serialized, navigate, setError]} id={msg.id._serialized}/> : null
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
