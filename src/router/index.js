import express,{Router} from 'express'
import indexController from '../controller/index.js'
import studentController from './studentMontor.js'

const router=express.Router()

router.get('/',indexController.homePage)


router.use('/user',studentController)

export default router