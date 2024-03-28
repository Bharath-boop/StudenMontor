import express from 'express'
import appRouter from './router/index.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use('/', appRouter)



app.listen(PORT, () => console.log(`Application listening ${PORT}`))