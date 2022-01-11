const mongoose = require("mongoose")
const AnswerSchema = new mongoose.Schema({
    answer: String,
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    answer_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{ timestamps: true });

const Answer = mongoose.model("Answer", AnswerSchema)
module.exports = Answer