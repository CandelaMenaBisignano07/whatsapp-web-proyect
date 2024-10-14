import React from 'react'
import { Link } from 'react-router-dom'
const ItemMessagesContact = ({message}) => {
      let condition = message.id.fromMe ? `message${message.type[0].toUpperCase()}${message.type.slice(1, message.length)}FromMe` : `message${message.type[0].toUpperCase()}${message.type.slice(1, message.length)}FromOthers`
      switch(message.type){
        case 'chat': 
          if(message.isGroup) return (<p className={condition}><strong>{message.author}</strong><br/>{message.body}</p>)
          else return <p className={condition}>{message.body}</p>
        case 'image':
          if(message.hasMedia) return(
              <img className={condition} src={`${message.pathToMedia}`}/>
          )
          else return <p className={`once${condition.slice(12, condition.length)}`}>imagen para ver una vez</p>
        case 'video':
          if(message.hasMedia) return(<video className={condition} controls src={`${message.pathToMedia}`}/>)
          else return <p className={`once${condition.slice(12, condition.length)}`}>video para ver una vez</p>
        case 'audio':
          return(
            <audio className={condition} controls src={`${message.pathToMedia}`}/>
          )
        case 'revoked':
          if(message.isGroup) return <p className={condition}><strong>{message.author}</strong><br/>este mensaje ha side eliminado 🚫</p>
          else return <p className={condition}>este mensaje ha side eliminado 🚫</p>
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
