import 'express-async-errors'
const express = require('express')
const cors = require('cors')
import 'reflect-metadata'
import userRoutes from './routers/usersRoutes'
import contactRoutes from './routers/contactRoutes'
import { handleErrors } from './errors'

const app = express()
app.use(express.json())
app.use('/users',userRoutes)
app.use('/contacts',contactRoutes)

app.use(handleErrors)

export default app