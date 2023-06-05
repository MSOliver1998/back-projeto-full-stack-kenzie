import {Response,Request} from 'express'
import {createUserService,deleteUserService,getAllUserService, getUserService, updateUserService} from '../services/usersServices'

async function createUsersController(req:Request,res:Response){
    const user=await createUserService(req.body)
    return res.status(201).json(user)
}

async function getUserContoller(req:Request,res:Response){
    const user=await getUserService(Number(req.params.id)) 
    return res.status(200).json(user)
}

async function getAllUsersController(req:Request,res:Response){
    const allUsers=await getAllUserService()
    return res.status(200).json(allUsers)
}

async function updateUserController(req:Request,res:Response){
    const user=await updateUserService(Number(req.params.id),req.body)

    return res.status(200).json(user)
}

async function deleteUserController(req:Request,res:Response){

    await deleteUserService(Number(req.params.id))
    res.status(204).send()
}

export {createUsersController,getUserContoller,getAllUsersController,updateUserController,deleteUserController}