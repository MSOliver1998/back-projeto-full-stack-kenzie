import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import jwt from "jsonwebtoken"
import 'dotenv/config'

const checkBodyData=(schema:ZodTypeAny)=>(req:Request,res:Response,next:NextFunction)=>{
    const newData=schema.parse(req.body)
    req.body=newData

    return next()
}

const checkLogin=(type:'all'|'admin' |'owern'|'adminOrOwern'='all')=>(req:Request,res:Response,next:NextFunction)=>{

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
            id: decoded?.sub,
            admin: decoded?.admin
        }
    })

    const error=()=>{
        throw new AppError('has not permission', 401)}

    switch(type){
        case 'all':
            next()
            break
        case  'owern':
            if (res.locals.token.id==req.params.id) next()
            else{
                error()
            }
            break
        case "admin":
            if (res.locals.token.admin) next()
            else{
                error()
            }
            break
        case "adminOrOwern":
            if(res.locals.token.admin || res.locals.id==req.params.id) next()
            else{
                error()
            }
            break
        default:
            error()
            
    }
}

export {checkBodyData,checkLogin}