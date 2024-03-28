import mongoos from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

mongoos.connect(`${process.env.DB_URl}/${process.env.DB_NAME}`)

export default mongoos  