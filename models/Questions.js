const mongoose = require("mongoose")
const QuestionSchema = new mongoose.Schema({
    description: String,
    category: {
        type: String,
        enum : ['Threat Hunting','Vulnerability Management']
    },
    stage: String
},{ timestamps: true });

const Question = mongoose.model("Question", QuestionSchema)
module.exports = Question