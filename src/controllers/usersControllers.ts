import {Response,Request} from 'express'
import {createUserService,getAllUserService} from '../services/usersServices'

async function createUsersController(req:Request,res:Response){
    const user=await createUserService(req.body)
    return res.status(201).json(user)
}

async function getAllUsersController(req:Request,res:Response){
    const allUsers=await getAllUserService()
    return res.status(200).json(allUsers)
}

export {createUsersController,getAllUsersController}