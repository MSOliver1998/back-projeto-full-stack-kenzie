import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import jwt from "jsonwebtoken"
import { error } from "console";
import 'dotenv/config'

const checkBodyData=(schema:ZodTypeAny)=>(req:Request,res:Response,next:NextFunction)=>{
    const newData=schema.parse(req.body)
    req.body=newData

    return next()
}

function userLoginIsValid(req:Request,res:Response,next:NextFunction){

    const secretKey=process.env.SECRET_KEY!
    
    const token=req.headers.authorization

    if(!token){
        throw new AppError('token is missing',401)
    }

    const authentication=token.split(' ')[1]

    jwt.verify(authentication,secretKey,(err:any,decoded:any)=>{
        if (err){
            throw new AppError(err.message,403)
        }
        res.locals.token = {
            id: decoded?.sub
        }
    })

    next()

}


export {checkBodyData,userLoginIsValid}