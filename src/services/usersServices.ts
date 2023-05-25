import { TAllUsers, TUser, TUserResponse} from '../interfaces/usersInterfaces';
import { UserResponse, allUserResponse } from '../schemas/usersSchemas';
import { User } from '../entities/usersEntities';
import {AppDataSource}  from '../data-source'

async function createUserService(data:TUser):Promise<TUserResponse>{

    const userRepository = AppDataSource.getRepository(User)
    const user=await userRepository.save(data)

    return UserResponse.parse(user)

}

async function getAllUserService():Promise<TAllUsers>{
    const userRepository = AppDataSource.getRepository(User)
    const allUsers= await userRepository.find()
    return allUserResponse.parse(allUsers)
}

 
export {createUserService,getAllUserService}