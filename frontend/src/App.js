import PrincipalPage from "./pages/PrincipalPage.js";
import ContactPage from "./pages/ContactPage.js";
import SideBar from "./components/SideBar.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
/// quiero hacer un coso de whatsapp en donde en el inicio aparezcan los mensajes recientemente enviados y que tambien de la opcion de chatbot automatico
/// tambien quiero un sidebar donde esten todos los contactos y se pueda ingresar a su contacto al chat (solo que muestre lo que nosotros enviamos) y podamos enviar mensajes desde ahi controlando el tiempo
/// ademas de que los mensajes tambien se puedan borrar, editar y buscar por fecha y por nombre.

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <SideBar/>
        <Routes>
          <Route path={"/:contactId"} element={<ContactPage/>}/>
          <Route path={"/"} element={<PrincipalPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
