import express from 'express'
import stdentRouter from '../controller/stdentMontor.js'
import student from '../models/student.js'

const router = express.Router()

router.post('/student', stdentRouter.addStudent)
router.post('/montor',stdentRouter.addMontor)
router.get('/student',stdentRouter.getAllStudentDetails)
router.get('/monter',stdentRouter.getAllMentorDetails)
router.put('/student/:id',stdentRouter.assignMentor)
// router.put('/montor/:id',stdentRouter.assignStudent)



export default router