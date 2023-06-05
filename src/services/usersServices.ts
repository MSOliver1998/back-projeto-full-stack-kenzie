import { TAllUsers, TUser, TUserResponse, TuserPartial} from '../interfaces/usersInterfaces';
import { UserResponse, AllUserResponse } from '../schemas/usersSchemas';
import { User } from '../entities/usersEntities';
import {User as userResponse} from '../schemas/usersSchemas'
import {AppDataSource}  from '../data-source'
import { AppError } from '../errors';
import { UserContact } from '../entities/userContactsEntities';
import bcrypt from 'bcryptjs'

async function createUserService(data:TUser):Promise<TUserResponse>{

    data.password=await bcrypt.hash(data.password,10)
    data.telefone=data.telefone.split(' ').join('')
    const userRepository = AppDataSource.getRepository(User)
    const user=await userRepository.save(data)

    return UserResponse.parse(user)

}

async function getUserService(id:number):Promise<TUserResponse>{
    const userRepository = AppDataSource.getRepository(User)
    const user= await userRepository.findOneBy({id:id})
    if(user){
        return UserResponse.parse(user)
    }else{
        throw new AppError('user not found',404)
    }

}

async function getAllUserService():Promise<TAllUsers>{
    const userRepository = AppDataSource.getRepository(User)
    const allUsers= await userRepository.find()
    return AllUserResponse.parse(allUsers)
}


async function updateUserService(id:number,data:TuserPartial):Promise<TUserResponse>{

    if(data.password){
        data.password= await bcrypt.hash(data.password,10)
        console.log(data.password)
    }

    const userRepository=AppDataSource.getRepository(User)

    const userFind=await userRepository.findOneBy({id:id})
    
    if (!userFind){
        throw new AppError('user not found',404)
    }

    const newUser={
        ...userFind,
        ...data
    }

    userRepository.save(UserResponse.parse(newUser))

    return UserResponse.parse(newUser)

}

async function deleteUserService(id:number){

    const userRepository=AppDataSource.getRepository(User)
    const userContactRepository=AppDataSource.getRepository(UserContact)
    const userFind= await userRepository.findOneBy({id:id})

    if(!userFind){
        throw new AppError('user not found',404)

    }

    const contactsFind= await userContactRepository.createQueryBuilder('contacts')
    .where('contacts.userId= :userId',{userId:id})
    .getMany()

    if(contactsFind){
        userContactRepository.remove(contactsFind)
    }
    
    userRepository.remove(userFind)

}
 
export {createUserService,getUserService,getAllUserService,updateUserService,deleteUserService}