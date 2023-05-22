import { Router} from "express";
import { createUsersController,getAllUsers } from "../controllers/users";


const usersRoutes=Router()

usersRoutes.post('',createUsersController)
usersRoutes.get('',getAllUsers)

export default usersRoutes

