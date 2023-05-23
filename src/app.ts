const express = require('express')
const cors = require('cors')
import 'reflect-metadata'
import userRoutes from './routers/usersRoutes'
import contactRoutes from './routers/contactRoutes'

const app = express()
app.use(express.json())
app.use('/users',userRoutes)
app.use('/contacts',contactRoutes)

export default app