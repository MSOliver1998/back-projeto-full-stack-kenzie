import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/usersEntities";
import { AppError } from "../errors";

async function userEmailExists(req:Request,res:Response,next:NextFunction){

    const userRepository= AppDataSource.getRepository(User)
    const emailExists=await userRepository.findOne({
        where:{email:req.body.email}}
    )

    if(emailExists){
        throw new AppError('user Email already exists',409)
    }

    next()
}

export {userEmailExists}