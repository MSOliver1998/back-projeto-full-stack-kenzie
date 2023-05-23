import {Response,Request} from 'express'
import { createContactService, getUserContactsService } from '../services/contactsServices'

async function createContactController(req:Request,res:Response){
    const contact=await createContactService(req.body)
    return res.status(201).json(contact)
}

async function getContactController(req:Request,res:Response){
    const contact=await getUserContactsService(req.params.id)
    return res.status(200).json(contact)
}

export {createContactController,getContactController}