import React, { useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { ClientContext } from '../context/ClientContext.js';
import { useNavigate } from 'react-router-dom';
const QrPage = () => {
    const [loading, setLoading] = useState(true)
    const [qr, setQr] = useState('')
    const {socket, client} = useContext(ClientContext)
    const navigate = useNavigate()

    useEffect(() => {
      socket.on('clientReady', (client_info) => {
        localStorage.setItem('client', JSON.stringify(client_info));
          return navigate('/home')
      });
      socket.on('qr', (qrImage) => {
        setQr(qrImage)
        setLoading(false)
      });
      return () => {
        socket.off('qr')
        socket.off('clientReady')
      };
    }, [navigate]);

    useEffect(()=>{
      if(client) return navigate('/home')
    }, [client, navigate])

    if(loading) return <Loader body={'waiting for qr'}/>
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
