import React from 'react'

const Button = ({body,callback, params, ...props}) => {
  return (
    <>
        <button onClick={()=> callback(...params)} {...props}>{body}</button>
    </>
  )
}

export default Button
