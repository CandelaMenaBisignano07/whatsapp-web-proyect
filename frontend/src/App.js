import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QrPage from "./pages/QrPage.js";
import ClientProvider from "./context/ClientContext.js";
import MessagesPage from "./itemListsContainers/ItemListContainerMessages.js";
import ItemListContainerContacts from './itemListsContainers/ItemListContainerContact.js';
import Error from './pages/error/Error.js';
import LoggedOut from './pages/LoggedOut.js';
/// quiero hacer un coso de whatsapp en donde en el inicio aparezcan los mensajes recientemente enviados y que tambien de la opcion de chatbot automatico
/// tambien quiero un sidebar donde esten todos los contactos y se pueda ingresar a su contacto al chat (solo que muestre lo que nosotros enviamos) y podamos enviar mensajes desde ahi controlando el tiempo
/// ademas de que los mensajes tambien se puedan borrar, editar y buscar por fecha y por nombre.

function App() {
  return (
    <div className="App">
        <ClientProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<QrPage/>}/>
              <Route path={"/:contactId"} element={<ItemListContainerContacts/>}/>
              <Route path={"/home"} element={<MessagesPage/>} />
              <Route path={"/error/:code"} element={<Error/>}/>
              <Route path={"/loggedOut"} element={<LoggedOut/>}/>
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </div>
  );
}

export default App;
