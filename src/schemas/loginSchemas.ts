import {z} from 'zod'

const Login=z.object({
    email:z.string().email(),
    password:z.string()
})

const Token=z.object({
    token:z.string()
})

export{
    Login,Token
}