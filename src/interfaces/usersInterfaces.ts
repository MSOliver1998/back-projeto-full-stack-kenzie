import { z } from 'zod'
import { User,UserResponse,allUserResponse} from '../schemas/usersSchemas'

type TUser=z.infer<typeof User>
type TUserResponse=z.infer<typeof UserResponse>
type TAllUsers=z.infer<typeof allUserResponse>

export {TUser,TUserResponse,TAllUsers}