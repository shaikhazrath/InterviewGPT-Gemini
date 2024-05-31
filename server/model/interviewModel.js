import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    answersWithQuestions: [{
        question: {
            type: String,
        },
        answer: {
            type: String,
            default:null
        },
        rating:{
            type:Number,
            default:null
        },
        feedback:{
            type:String,
            default:null
        }
    }],
    counter:{
        type:Number,
        default:0
    },
    dateAndTime: {
        type: Date,
        default: Date.now
    }

});

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
