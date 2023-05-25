import { Router} from "express";
import {createContactController,getContactController} from '../controllers/contactControllers'
import { checkBodyData } from "../Middlewares/appMiddlewares";
import { Contact } from "../schemas/contactsSchemas";

const contactRoutes=Router()

contactRoutes.post('',checkBodyData(Contact),createContactController)
contactRoutes.get('/:id',getContactController)

export default contactRoutes