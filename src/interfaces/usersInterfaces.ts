import { z } from 'zod'
import { User,UserPartial,UserResponse,AllUserResponse} from '../schemas/usersSchemas'

type TUser=z.infer<typeof User>
type TUserResponse=z.infer<typeof UserResponse>
type TAllUsers=z.infer<typeof AllUserResponse>
type TuserPartial=z.infer<typeof UserPartial>

export {TUser,TUserResponse,TAllUsers,TuserPartial}