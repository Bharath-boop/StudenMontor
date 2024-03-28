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
    mentor: {
        name: String,
        mentor_id: {
            type: mongoos.Schema.Types.ObjectId,
            ref: 'mentor'
        },
        status: {
            type: Boolean,
            default: false
        }

    }
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
    },
    student: [
        {
            name: String,
            student_id: String,
            _id: false
        }
    ]
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
