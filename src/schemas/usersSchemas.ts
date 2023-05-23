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
    id:z.string(),
    createAt:z.date()
})

export {User,UserResponse}