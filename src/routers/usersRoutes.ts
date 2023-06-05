import { Router} from "express";
import { createUsersController,deleteUserController,getAllUsersController, getUserContoller, updateUserController } from "../controllers/usersControllers";
import { checkBodyData, checkLogin,  } from "../Middlewares/appMiddlewares";
import {userEmailExists} from '../Middlewares/usersMiddlewares'
import { User, UserPartial } from "../schemas/usersSchemas";
import { get } from "http";


const usersRoutes=Router()

usersRoutes.post('',checkBodyData(User),userEmailExists,createUsersController)
usersRoutes.get('',checkLogin(),getAllUsersController)
usersRoutes.get('/:id',checkLogin('owern'),getUserContoller)

usersRoutes.patch('/:id',checkLogin('owern'),checkBodyData(UserPartial),userEmailExists,updateUserController)
usersRoutes.delete('/:id',checkLogin('owern'),deleteUserController)

export default usersRoutes
