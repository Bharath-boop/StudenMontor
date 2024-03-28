import model from '../models/student.js'
import dotenv from 'dotenv'
dotenv.config()

const addStudent = async (req, res) => {
    try {
        const student = await model.studentModel.findOne({ email: req.body.email })
        if (!student) {
            let newUser = await model.studentModel.create(req.body)
            res.status(200).send({
                message: "add data seccesfull"
            })
        }
        else {
            res.status(400).send({
                message: `this ${req.body.email} alreay exect`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}
const addMontor = async (req, res) => {

    try {
        const mentor = await model.mentorModel.findOne({ email: req.body.email })
        if (!mentor) {
            let newUser = await model.mentorModel.create(req.body)
            res.status(200).send({
                message: "add data seccesfull"
            })
        }
        else {
            res.status(400).send({
                message: `this ${req.body.email} alreay exect`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const getAllStudentDetails = async (req, res) => {
    try {
        const student = await model.studentModel.find()
        res.status(200).send({
            message: "student data suceessfull fetching in the database",
            student
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

const getAllMentorDetails = async (req, res) => {
    try {
        const mentor = await model.mentorModel.find()
        res.status(200).send({
            message: "Mentor details  suceessfull fetching in the database",
            mentor
        })

    } catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })
    }
}

let assignMentor = async (req, res) => {
    try {
        let student = await model.studentModel.findById({ _id: req.params.id })
        let mentor = await model.mentorModel.findById({ _id: req.body.mentor.mentor_id })
        let mentor_name = mentor.name
        let id = student._id
        let count = 0;
        if (student && mentor) {
            for (let i = 0; i < mentor.student.length; i++) {
                let n = mentor.student[i].student_id
                console.log(n);
                if (id == n) {
                    count++
                    break
                }
            }
            if (count === 0) {
                student.name = student.name,
                student.email = student.email,
                student.mobile = student.mobile,
                student.batch = student.batch,
                student.mentor.name = mentor_name
                student.mentor.status = true
                await student.save()
                mentor.student.push({ "name": student.name, "student_id": student._id })
                await mentor.save()
                res.status(200).send({
                    message: 'Assigned a student successfully',
                    student
                });
                count = 0
            }
            else {
                res.status(400).send({
                    message: 'this student alreday assgnted this mentor',
                });
                count = 0
            }
        }
        else {
            res.status(400).send({
                message: 'invalid user id or mentor id'
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "internal server error",
            error: error.message
        })

    }
}

// let assignStudent = async (req, res) => {
//     try {
//         let student = await model.studentModel.findById({ _id: req.params.id })
//         let mentor = await model.mentorModel.findById({ _id: req.body.mentor.mentor_id })
//         let mentor_name = mentor.name
//         let id = student._id
//         let count = 0;
//         if (student && mentor) {
//             for (let i = 0; i < mentor.student.length; i++) {
//                 let n = mentor.student[i].student_id
//                 console.log(n);
//                 if (id == n) {
//                     count++
//                     break
//                 }
//             }
//             if (count === 0) {
//                 student.name = student.name,
//                 student.email = student.email,
//                 student.mobile = student.mobile,
//                 student.batch = student.batch,
//                 student.mentor.name = mentor_name
//                 student.mentor.status = true
//                 await student.save()
//                 mentor.student.push({ "name": student.name, "student_id": student._id })
//                 await mentor.save()
//                 res.status(200).send({
//                     message: 'Assigned a student successfully',
//                     student
//                 });
//                 count = 0
//             }
//             else {
//                 res.status(400).send({
//                     message: 'this student alreday assgnted this mentor',
//                 });
//                 count = 0
//             }
//         }
//         else {
//             res.status(400).send({
//                 message: 'invalid user id or mentor id'
//             });
//         }
//     }
//     catch (error) {
//         res.status(500).send({
//             message: "internal server error",
//             error: error.message
//         })

//     }
// }



export default {
    addStudent,
    addMontor,
    getAllStudentDetails,
    getAllMentorDetails,
    assignMentor,
    // assignStudent
}