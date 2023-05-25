import {Response,Request} from 'express'
import { createContactService, deleteContactService, getUserContactsService, updateContactService } from '../services/contactsServices'

async function createContactController(req:Request,res:Response){
    const contact=await createContactService(req.body,res.locals.token.id)
    return res.status(201).json(contact)
}

async function getContactController(req:Request,res:Response){
    const contact=await getUserContactsService(Number(req.params.id))
    return res.status(200).json(contact)
}

async function deleteContactController(req:Request,res:Response){
    await deleteContactService(Number(req.params.id))
    return res.status(403).send()
}

async function updateContactController(req:Request,res:Response){
    const contactUpdated=await updateContactService(Number(req.params.id),req.body)
    return res.status(200).json(contactUpdated)
}

export {createContactController,getContactController,deleteContactController,updateContactController}