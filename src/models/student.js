import mongoos from "./index.js";
import dotenv from 'dotenv'
dotenv.config()

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const studentSchema = new mongoos.Schema({
    name: {
        type: String,
        required: [true, 'name is requied']
    },
    email: {
        type: String,
        required: [true, 'email is requied'],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: [true, 'mobile number requied']
    },
    batch: {
        type: String,
        required: [true, 'batch is requied']
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
   
}, {
    collection: 'student',
    versionKey: false
})


const mentorSchema = new mongoos.Schema({
    name: {
        type: String,
        required: [true, 'name is requied']
    },
    email: {
        type: String,
        required: [true, 'email is requied'],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: [true, 'mobile number requied']
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'mentor',
    versionKey: false
})
const studentModel = mongoos.model('student', studentSchema)
const mentorModel = mongoos.model('mentor', mentorSchema)

export default {
    studentModel,
    mentorModel
} 
