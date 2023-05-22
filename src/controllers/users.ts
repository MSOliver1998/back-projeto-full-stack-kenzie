import {Response,Request} from 'express'

async function createUsersController(req:Request,res:Response){
    return res.status(201).json('Criar usuario')
}

async function getAllUsers(req:Request,res:Response){
    return res.status(200).json({'message':'retornar usuarios'})
}

export {createUsersController,getAllUsers}