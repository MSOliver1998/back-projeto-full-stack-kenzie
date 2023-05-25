import { Router} from "express";
import {createContactController,deleteContactController,getContactController, updateContactController} from '../controllers/contactControllers'
import { checkBodyData, userLoginIsValid } from "../Middlewares/appMiddlewares";
import { Contact, ContactPartial } from "../schemas/contactsSchemas";
import { contactEmailExists } from "../Middlewares/contactsMiddlewares";

const contactRoutes=Router()

contactRoutes.post('',userLoginIsValid,checkBodyData(Contact),createContactController)
contactRoutes.get('/:id',getContactController)
contactRoutes.delete('/:id',deleteContactController)
contactRoutes.patch('/:id',checkBodyData(ContactPartial),contactEmailExists,updateContactController)

export default contactRoutes