import { User } from "../schemas/usersSchemas"

const Contact=User.omit({
    password:true
})

export {Contact}