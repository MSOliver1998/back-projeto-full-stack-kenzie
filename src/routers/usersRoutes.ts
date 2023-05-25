import { Router} from "express";
import { createUsersController,deleteUserController,getAllUsersController, updateUserController } from "../controllers/usersControllers";
import { checkBodyData } from "../Middlewares/appMiddlewares";
import {userEmailExists} from '../Middlewares/usersMiddlewares'
import { User, UserPartial } from "../schemas/usersSchemas";


const usersRoutes=Router()

usersRoutes.post('',checkBodyData(User),userEmailExists,createUsersController)
usersRoutes.get('',getAllUsersController)

usersRoutes.patch('/:id',checkBodyData(UserPartial),userEmailExists,updateUserController)
usersRoutes.delete('/:id',deleteUserController)

export default usersRoutes

