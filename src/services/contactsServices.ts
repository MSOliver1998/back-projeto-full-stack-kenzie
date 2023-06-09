import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contactsEntities"
import { UserContact } from "../entities/userContactsEntities"
import { User } from "../entities/usersEntities"
import { AppError } from "../errors"
import { TAllContacts, TAllContactsUser, TContact, TContactPartial, TContactResponse } from "../interfaces/contactInterfaces"
import { AllContactsResponse, AllContactsUsersResponse, ContactResponse } from "../schemas/contactsSchemas"

async function createContactService(data:TContact,userId:number):Promise<TContactResponse>{
    
    data.telefone=data.telefone.split(' ').join('')

    const userRepository=AppDataSource.getRepository(User)
    const contactRepository=AppDataSource.getRepository(Contact)
    const userContactRepository=AppDataSource.getRepository(UserContact)

    let contact= await contactRepository.findOneBy({email:data.email})
    if (contact==null){
        contact= await contactRepository.save(data)
    }

    const user= await userRepository.findOneBy({id:userId})
    const newContact= {user:user!,contact:contact}

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

async function getUserContactsService(id:number):Promise<TAllContactsUser>{

    const userRepository= AppDataSource.getRepository(User)

    const findContacts= await userRepository.createQueryBuilder('user')
    .innerJoinAndSelect('user.contacts','contacts')
    .innerJoinAndSelect('contacts.contact','users')
    .where('contacts.userId= :userId',{userId:id})
    .getOne()
 
    if (findContacts){
        return AllContactsUsersResponse.parse(findContacts)
    }
    else{
        throw new AppError('contacts not found',404)
    }

}

async function getAllContactsService():Promise<TAllContacts>{

    const userRepository= AppDataSource.getRepository(User)

    const findContacts= await userRepository.createQueryBuilder('user')
    .innerJoinAndSelect('user.contacts','contacts')
    .innerJoinAndSelect('contacts.contact','users')
    .getMany()
 

    if (findContacts){
        return AllContactsResponse.parse(findContacts)
    }
    else{
        throw new AppError('contacts not found',404)
    }


}

async function deleteContactService(id:number,userId:Number):Promise<void>{

    const contactUserRepository= AppDataSource.getRepository(UserContact)

    const contactFind= await contactUserRepository.findOne({
        relations:{
            contact:true,
            user:true
        },
        where:{
            id:id
        }
    })

    if (!contactFind){
        throw new AppError('contact not found in this account',404)
    }
    
    contactFind.user.id==userId && 
    contactUserRepository.remove(contactFind)
}

async function updateContactService(id:number,data:TContactPartial):Promise<TContactResponse>{

    const contactUserRepository=AppDataSource.getRepository(UserContact)
    const contactRepository=AppDataSource.getRepository(Contact)

    const contactUserFind=await contactUserRepository.findOne({
        where:{id:id},
        relations:{
            contact:true
        }
    })

    const contactFind= await contactRepository.findOneBy({id:contactUserFind!.contact.id})

    if (!contactFind){
        throw new AppError('contact not found',404)
    }

    const newContact={
        ...contactFind,
        ...data
    }

    contactRepository.save(ContactResponse.parse(newContact))

    return ContactResponse.parse(newContact)
}

export{createContactService,getUserContactsService,deleteContactService,updateContactService,getAllContactsService}

