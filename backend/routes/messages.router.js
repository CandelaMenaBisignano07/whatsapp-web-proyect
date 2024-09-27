import { Router } from "express";
import { sendPersonalMessages, getAllMessages, getAllContacts, getProfilePicture, getOneContact} from "../controllers/messages.controller.js"
const router = Router()
router.get('/', getAllMessages);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getOneContact);
router.get('/:id', getProfilePicture);
router.post('/', sendPersonalMessages);
export default router