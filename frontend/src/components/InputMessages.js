import React from 'react'

const InputMessages = ({inputData, callback}) => {
  return (
    <div>
        <input value={inputData.message} placeholder="mensaje" name="message" onChange={(e)=> callback(e.currentTarget.name, e.currentTarget.value)}/>
        <input value={inputData.seconds} type="number" name="seconds" min={1} max={60} onChange={(e)=> callback(e.currentTarget.name, e.currentTarget.value)}/>
        <input value={inputData.number} placeholder="numero" name="number" onChange={(e)=> callback(e.currentTarget.name, e.currentTarget.value)}/>
    </div>
  )
}

export default InputMessages
