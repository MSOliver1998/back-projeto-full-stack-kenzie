import { TAllUsers, TUser, TUserResponse} from '../interfaces/usersInterfaces';
import { UserResponse } from '../schemas/usersSchemas';

async function createUserService(data:TUser):Promise<TUserResponse>{

    const user={...data, createAt:new Date(),id:'1'}
    return UserResponse.parse(user)

}

async function getAllUserService():Promise<TAllUsers>{

    return []
}

 
export {createUserService,getAllUserService}