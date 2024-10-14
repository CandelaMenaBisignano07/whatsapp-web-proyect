import React from 'react'
import { Link } from 'react-router-dom'
const ItemContact = ({contactId, name}) => {
  return (
    <>
      <li className='contactItemList'>
        <Link to={`/${contactId}`}>{name}</Link>
      </li>
    </>
  )
}

export default ItemContact
