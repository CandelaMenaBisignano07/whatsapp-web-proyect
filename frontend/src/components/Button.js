import React from 'react'

const Button = ({body,callback, ...props}) => {
  return (
    <>
        <button onClick={()=> callback(props.id ? props.id : null)} {...props}>{body}</button>
    </>
  )
}

export default Button
