import { Request,Response,NextFunction } from "express"
import { Contact } from "../entities/contactsEntities"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { UserContact } from "../entities/userContactsEntities"

async function contactEmailExists(req:Request,res:Response,next:NextFunction){
    
    const contactRepository= AppDataSource.getRepository(Contact)
    const userContactsRepository=AppDataSource.getRepository(UserContact)
    if(req.body.email){
        const contactFind= await userContactsRepository.findOne({
            where:{
                id:Number(req.params.contactId)
            },relations:{
                contact:true
            }
        
        })

        console.log(contactFind)
        const emailExists=await contactRepository.findOne({
            where:{email:req.body.email}}
        )
        
        if(emailExists && emailExists.id!=contactFind?.contact.id){
            throw new AppError('contact email already exists',409)
        }
        
        next()
    }
        
    if(!req.body.email){
        next()
    }

}

export {contactEmailExists}