import { Router} from "express";
import {createContactController,deleteContactController,getAllContactController,getContactController, updateContactController} from '../controllers/contactControllers'
import {checkBodyData, checkLogin, } from "../Middlewares/appMiddlewares";
import { Contact, ContactPartial } from "../schemas/contactsSchemas";
import { contactEmailExists } from "../Middlewares/contactsMiddlewares";

const contactRoutes=Router()

contactRoutes.post('',checkLogin(),checkBodyData(Contact),createContactController)
contactRoutes.get('',checkLogin('admin'),getAllContactController)

contactRoutes.get('/:id',checkLogin('owern'),getContactController)
contactRoutes.delete('/:id/:contactId',checkLogin('owern'),deleteContactController)
contactRoutes.patch('/:id',checkLogin(),checkBodyData(ContactPartial),contactEmailExists,updateContactController)

export default contactRoutes