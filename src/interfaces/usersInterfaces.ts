import { z } from 'zod'
import { User,UserResponse} from '../schemas/usersSchemas'


type TUser=z.infer<typeof User>

type TUserResponse=z.infer<typeof UserResponse>
type TAllUsers=TUser[]

export {TUser,TUserResponse,TAllUsers}