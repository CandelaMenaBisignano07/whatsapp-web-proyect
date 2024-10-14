import React from 'react'
import ItemContact from '../components/LinkToContact'
const ItemListContactsSideBar = ({data}) => {
  return (
    <div className="containerContacts">
        {
            data.map(c=><ItemContact key={c.id.user} name={c.name} contactId={c.id._serialized}/>)
        }
    </div>
  )
}

export default ItemListContactsSideBar
