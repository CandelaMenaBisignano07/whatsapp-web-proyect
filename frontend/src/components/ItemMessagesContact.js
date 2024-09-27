import React from 'react'
import { Link } from 'react-router-dom'
const ItemMessagesContact = ({message}) => {
      switch(message.type){
        case 'chat':
          return(
            <p>{message.body}</p>
          )
        case 'image':
          return(
            <img className='imageMessage'src={`${message.pathToMedia}`}/>
          )
        case 'video':
          return(
            <video className='videoMessage' controls src={`${message.pathToMedia}`}/>
          )
        case 'audio':
          return(
            <audio className='audioMessage' controls src={`${message.pathToMedia}`}/>
          )
        case 'ptt':
          return(
            <audio className='audioMessage' controls src={`${message.pathToMedia}`}/>
          )
        case 'document':
          return(
            <Link to={'yourmomo'}>qsy un archivito</Link>
          )
        case 'sticker':
          return(
            <img  className='stickerMessage'src={`${message.pathToMedia}`}/>
          )
        case 'location':
          return(
            <div>todavia no (locacion)</div>
          )
        case 'contact':
          return(<p>recibi un contacto</p>)
        case 'default':
          return <p>mensaje no soportado</p>
      }
}

export default ItemMessagesContact
