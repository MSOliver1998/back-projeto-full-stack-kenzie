import {z} from 'zod'
import { Login, Token } from '../schemas/loginSchemas'

type TLogin=z.infer<typeof Login>
type TToken=z.infer<typeof Token>

export {TLogin,TToken}