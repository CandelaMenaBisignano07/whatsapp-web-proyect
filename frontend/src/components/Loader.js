import React from 'react'

const Loader = ({body}) => {
  return (
    <div className='loaderContainer'>
      <div className='loader'></div>
      <p>{body}</p>
    </div>
  )
}

export default Loader
