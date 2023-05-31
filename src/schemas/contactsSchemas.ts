import {string, z} from 'zod'
import { UserResponse } from './usersSchemas'

const Contact=z.object({
    name:z.string(),
    email:z.string().email(),
    telefone:z.string().min(11,'insira o telefone com o ddd').max(12,'telefone inválido'),
})

const ContactResponse=Contact.extend({
    id: z.number(),
    createdAt:z.date().or(z.string())
})

const AllContactsUsersResponse=UserResponse.extend({
    contacts:z.object({
        createdAt:z.string().or(z.date()),
        id:z.number(),
        contact:ContactResponse.omit({
            createdAt:true,
            id:true
        })
    }).array()
})

const AllContactsResponse=AllContactsUsersResponse.array()

const ContactPartial=Contact.partial()

export { Contact, AllContactsResponse, ContactResponse,ContactPartial,AllContactsUsersResponse }