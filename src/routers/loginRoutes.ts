import { Router } from "express";
import loginController from "../controllers/loginController";
import { checkBodyData } from "../Middlewares/appMiddlewares";
import { Login } from "../schemas/loginSchemas";

const loginRoutes=Router()

loginRoutes.post('',checkBodyData(Login),loginController)


export default loginRoutes