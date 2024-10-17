import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom'

const Error = () => {
    const {code} = useParams()
    const{error} = useContext(ClientContext)
    return (
    <>
        <h1>{code}</h1>
        <p>{error.message}</p>
    </>
  )
}

export default Error
