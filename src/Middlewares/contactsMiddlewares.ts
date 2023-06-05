import { Request,Response,NextFunction } from "express"
import { Contact } from "../entities/contactsEntities"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"

async function contactEmailExists(req:Request,res:Response,next:NextFunction){

    const contactRepository= AppDataSource.getRepository(Contact)

    if(!req.body.email){
        next()
    }
    
    const emailExists=await contactRepository.findOne({
        where:{email:req.body.email}}
    )

    if(emailExists && emailExists.id!=res.locals.id){
        throw new AppError('contact Email already exists',409)
    }

    next()
}

export {contactEmailExists}