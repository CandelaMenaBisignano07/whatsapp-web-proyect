import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client';

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [localStorageIsLoading, setLocalStorageIsLoading] = useState(JSON.parse(localStorage.getItem('loadingMessage')))
  const [client, setClient] = useState(() => {
    const clientStorage = localStorage.getItem('client');
    return clientStorage ? JSON.parse(clientStorage) : '';
  });

  const[error, setError] = useState({})
  localStorage.setItem('loadingMessage', JSON.stringify(false));

  const socket=io('http://localhost:8080');
  const URL = 'http://localhost:8080/api/';

  const isAuthenticated = ()=> !!client


  return (
    <ClientContext.Provider value={{error, setError, isAuthenticated, URL, client, setClient, socket, localStorageIsLoading, setLocalStorageIsLoading}}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;