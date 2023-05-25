import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contactsEntities"
import { UserContact } from "../entities/userContacts"
import { User } from "../entities/usersEntities"
import { AppError } from "../errors"
import { TAllContacts, TContact, TContactResponse } from "../interfaces/contactInterfaces"
import { AllContacts, ContactResponse } from "../schemas/contactsSchemas"

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

async function getUserContactsService(id:string):Promise<UserContact[]>{

    const userContactsRepository=AppDataSource.getRepository(UserContact)

    const findContacts= await userContactsRepository.createQueryBuilder('contacts')
    .innerJoinAndSelect('contacts.contact','contact')
    .where('contacts.userId= :userId', {userId:id})
    .getMany()

    return findContacts

}

export{createContactService,getUserContactsService}