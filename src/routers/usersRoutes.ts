import { Router} from "express";
import { createUsersController,deleteUserController,getAllUsersController, updateUserController } from "../controllers/usersControllers";
import { checkBodyData, checkLogin,  } from "../Middlewares/appMiddlewares";
import {userEmailExists} from '../Middlewares/usersMiddlewares'
import { User, UserPartial } from "../schemas/usersSchemas";


const usersRoutes=Router()

usersRoutes.post('',checkBodyData(User),userEmailExists,createUsersController)
usersRoutes.get('',checkLogin(),getAllUsersController)

usersRoutes.patch('/:id',checkLogin('owern'),checkBodyData(UserPartial),userEmailExists,updateUserController)
usersRoutes.delete('/:id',checkLogin('owern'),deleteUserController)

export default usersRoutes
