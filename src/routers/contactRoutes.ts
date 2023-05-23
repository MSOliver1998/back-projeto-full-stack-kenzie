import { Router} from "express";
import {createContactController,getContactController} from '../controllers/contactControllers'

const contactRoutes=Router()

contactRoutes.post('',createContactController)
contactRoutes.get('/:id',getContactController)

export default contactRoutes