import React from 'react'

const ItemMessage = ({key_, description, recipient, created_at}) => {
  return (
    <article className='messageCard' key={key_}>
      <p>message: {description}</p>
      <p>recipient: {recipient}</p>
      <p>sended at: {created_at} </p>
    </article>
  )
}

export default ItemMessage
