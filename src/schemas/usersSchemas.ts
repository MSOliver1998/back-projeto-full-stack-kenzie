import {z} from 'zod'

const User=z.object({
    name:z.string(),
    email:z.string().email(),
    telefone:z.string(),
    password:z.string(),
})


const UserResponse=User.omit({
    password:true
}).extend({
    id:z.number(),
    createdAt:z.date().or(z.string())
})

const UserPartial=User.partial()

const AllUserResponse=z.array(UserResponse)

export {User,UserResponse,AllUserResponse,UserPartial}