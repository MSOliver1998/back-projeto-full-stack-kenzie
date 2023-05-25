import { Request,Response } from "express";
import loginService from "../services/loginService";
import { TToken } from "../interfaces/loginInterfaces";


async function loginController(req:Request,res:Response){

    return res.status(200).json(await loginService(req.body))
    
}

export default loginController