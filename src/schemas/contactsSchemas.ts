import {z} from 'zod'

const Contact=z.object({
    name:z.string(),
    email:z.string().email(),
    telefone:z.string(),
})

const ContactResponse=Contact.extend({
    id: z.number(),
    createdAt:z.date().or(z.string())
})

const AllContacts=z.array(ContactResponse)

const ContactPartial=Contact.partial()

export { Contact, AllContacts, ContactResponse,ContactPartial }