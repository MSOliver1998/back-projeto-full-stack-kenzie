import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contactsEntities"
import { UserContact } from "../entities/userContacts"
import { User } from "../entities/usersEntities"
import { AppError } from "../errors"
import { TContact, TContactResponse } from "../interfaces/contactInterfaces"
import { ContactResponse } from "../schemas/contactsSchemas"

async function createContactService(data:TContact,userId:number):Promise<TContactResponse>{

    const userRepository=AppDataSource.getRepository(User)
    const contactRepository=AppDataSource.getRepository(Contact)
    const userContactRepository=AppDataSource.getRepository(UserContact)

    let contact= await contactRepository.findOneBy({email:data.email})
    if (contact==null){
        contact= await contactRepository.save(data)
    }

    const user= await userRepository.findOneBy({id:userId})
    const newContact={user:user!,contact:contact}

    const findContacts= await userContactRepository.createQueryBuilder('contact')
    .where('contact.userId= :userId',{userId:userId})
    .andWhere('contact.contactId= :contactId',{contactId:contact.id})
    .getOne()

    if(findContacts){
        throw new AppError('contact already exists in this account',409)
    }

    userContactRepository.save(newContact)

    return ContactResponse.parse(contact)
}

async function getUserContactsService(id:string):Promise<TContact[]>{

    return []

}

export{createContactService,getUserContactsService}