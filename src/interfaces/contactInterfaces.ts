import { z } from 'zod'
import { Contact,AllContacts,ContactResponse,ContactPartial} from '../schemas/contactsSchemas'

type TContact=z.infer<typeof Contact>
type TContactResponse=z.infer<typeof ContactResponse>
type TAllContacts=z.infer<typeof AllContacts>
type TContactPartial=z.infer<typeof ContactPartial>

export{TContact,TAllContacts,TContactResponse,TContactPartial}