import React from 'react'
import { Link } from 'react-router-dom'
const ItemMessagesContact = ({message}) => {
      const condition = message.id.fromMe ? `message${message.type[0].toUpperCase()}${message.type.slice(1, message.length)}FromMe` : `message${message.type[0].toUpperCase()}${message.type.slice(1, message.length)}FromOthers`
      switch(message.type){
        case 'chat':
          return (<p className={condition}>{message.body}</p>)
          
        case 'image':
          return(
            <>
              <img src={`${message.pathToMedia}`} className={condition}/>
            </>
          )
            
        case 'video':
          if(message.hasMedia) return(<video className={condition} controls src={`${message.pathToMedia}`}/>)
          else return <p>video para ver una vez</p>
        case 'audio':
          return(
            <audio className={condition} controls src={`${message.pathToMedia}`}/>
          )
        case 'ptt':
          return(
            <audio className={condition} controls src={`${message.pathToMedia}`}/>
          )
        case 'document':
          return(
            <Link to={'yourmomo'} className={condition}>qsy un archivito</Link>
          )
        case 'sticker':
          return(
            <img  className={condition} src={`${message.pathToMedia}`}/>
          )
        case 'location':
          return(
            <div className={condition}>todavia no (locacion)</div>
          )
        case 'contact':
          return(<p className={condition}>recibi un contacto</p>)
        case 'default':
          return <p className={condition}>mensaje no soportado</p>
      }
}

export default ItemMessagesContact
