import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [localStorageIsLoading, setLocalStorageIsLoading] = useState(JSON.parse(localStorage.getItem('loadingMessage')))
  const [client, setClient] = useState(() => {
    const clientStorage = localStorage.getItem('client');
    return clientStorage ? JSON.parse(clientStorage) : '';
  });


  localStorage.setItem('loadingMessage', JSON.stringify(false))
  const socket=io('http://localhost:8080');
  const URL = 'http://localhost:8080/api/';
  
  const isAuthenticated = () => !!client;
  useEffect(() => {
    // Guardar el cliente en localStorage cuando cambia
    if (client) {
      localStorage.setItem('client', JSON.stringify(client));
      setClient(JSON.parse(localStorage.getItem('client')))
    } else {
      localStorage.removeItem('client'); // Eliminar si client es null
    }
  }, []);

  return (
    <ClientContext.Provider value={{ isAuthenticated, URL, client, setClient, socket, localStorageIsLoading, setLocalStorageIsLoading}}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;