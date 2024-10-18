import { Router } from "express";
import { sendPersonalMessages, getAllMessages, deleteMessage, uptadeMessage} from "../controllers/messages.controller.js"
import { handleClient } from "../middlewares/middlewares.js";
const router = Router()
//faltan middlewares en las rutas
//falta el router de contactos (osea dividir las responsabilidades)
router.get('/',handleClient, getAllMessages);
router.post('/',handleClient, sendPersonalMessages);
router.put('/:id',handleClient, uptadeMessage);
router.delete('/:id', handleClient, deleteMessage);
export default router