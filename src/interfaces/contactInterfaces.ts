import { z } from 'zod'
import { Contact } from '../schemas/contactsSchemas'

type TContact=z.infer<typeof Contact>

export{TContact}