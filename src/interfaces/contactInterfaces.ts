import { z } from 'zod'
import { Contact,AllContacts,ContactResponse } from '../schemas/contactsSchemas'

type TContact=z.infer<typeof Contact>
type TContactResponse=z.infer<typeof ContactResponse>
type TAllContacts=z.infer<typeof AllContacts>

export{TContact,TAllContacts,TContactResponse}