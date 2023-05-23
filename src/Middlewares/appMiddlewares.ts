import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";


const checkBodyData=(schema:ZodTypeAny)=>(req:Request,res:Response,next:NextFunction)=>{
    const newData=schema.parse(req.body)
    req.body=newData

    return next()
}

export {checkBodyData}