import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import router from './router/index.js'
import mongoose from 'mongoose'

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.flstk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
// app setup
const app = express()
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.raw())
router(app)

const port = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(port)
console.log('Server listening on ', port)
