import {z} from 'zod'

const Contact=z.object({
    name:z.string(),
    email:z.string().email(),
    telefone:z.string(),
})

const ContactResponse=Contact.extend({
    createdAt:z.date().or(z.string())
})

const AllContacts=z.array(ContactResponse)

export { Contact, AllContacts, ContactResponse }