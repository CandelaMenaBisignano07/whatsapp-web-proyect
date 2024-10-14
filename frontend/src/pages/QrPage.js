import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { ClientContext } from '../context/ClientContext.js';
import { useNavigate } from 'react-router-dom';
const QrPage = () => {
    const [loading, setLoading] = useState(true)
    const [qr, setQr] = useState('')
    const { setClient, socket, client} = useContext(ClientContext)
    const navigate = useNavigate('/home')

    useEffect(() => {
      if(client) navigate('/home')
      socket.on('clientReady', (client) => {
        setClient(client)
        navigate('/home')
      });
      socket.on('qr', (qrImage) => {
        console.log('qr')
        setQr(qrImage)
        setLoading(false)
      });
      return () => {
        socket.off('qr')
        socket.off('clientReady')
      };
    }, []);


    if(loading) return <Loader/>
    if(client) return navigate('/home')
    return (
    <section className='containerFlexQr'>
      <div className='containerContentQr'>
        <h1>chatbot whatsapp</h1>
        <div className='containerQr'>
          <img src={qr} alt='qr'/>
        </div>
      </div>
    </section>
  )
}

export default QrPage
