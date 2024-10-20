import { Router } from "express";
import { getProfilePicture, getAllContacts, getOneContact, destroyClient} from "../controllers/contacts.controller.js";
import { handleClient } from "../middlewares/middlewares.js";
const router = Router();

router.get('/',handleClient, getAllContacts);
router.get('/:id', handleClient, getOneContact);
router.get('/profile-picture/:id', handleClient, getProfilePicture);
router.delete('/', handleClient, destroyClient);

export default router