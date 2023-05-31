import { z } from 'zod'
import { Contact,ContactResponse,ContactPartial, AllContactsResponse, AllContactsUsersResponse} from '../schemas/contactsSchemas'

type TContact=z.infer<typeof Contact>
type TContactResponse=z.infer<typeof ContactResponse>
type TAllContacts=z.infer<typeof AllContactsResponse>
type TAllContactsUser=z.infer<typeof AllContactsUsersResponse>
type TContactPartial=z.infer<typeof ContactPartial>

export{TContact,TAllContactsUser,TAllContacts,TContactResponse,TContactPartial}