const express = require('express')
const cors = require('cors')
import 'reflect-metadata'
import userRoutes from './routers/usersRoutes'
import { Request,Response } from 'express'

const app = express()
app.use(express.json())
app.use('/users',userRoutes)

export default app