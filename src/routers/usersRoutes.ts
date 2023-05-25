import { Router} from "express";
import { createUsersController,getAllUsersController } from "../controllers/usersControllers";
import { checkBodyData } from "../Middlewares/appMiddlewares";
import {userEmailExists} from '../Middlewares/usersMiddlewares'
import { User } from "../schemas/usersSchemas";


const usersRoutes=Router()

usersRoutes.post('',checkBodyData(User),userEmailExists,createUsersController)
usersRoutes.get('',getAllUsersController)

export default usersRoutes

