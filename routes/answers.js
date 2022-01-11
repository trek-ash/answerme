const router = require('express').Router();
const Answer = require("../models/Answer");
const {userAuth} = require("../middleware/auth")

router.post("/", userAuth, async (req, res)=>{
    try{
        const {answer, questionId} = req.body;
        const {user} = req
        console.log(user)
        const ans = new Answer({
            answer,
            questionId,
            answer_by: user._id
        })
        const answerStatus = await ans.save()

        res.status(200)
            .json({
                answerStatus
            })
    }catch(e)   {
        res.status(500)
            .json({
                error: "Something went wrong",
                message: e
            })
    }
    
})
router.get("/user", userAuth, async (req, res)=>{
    try {
        
        const {user} = req
        const userAnswers = await Answer.find({answer_by: user._id})
    
        res.status(200)
        .json({
            answers: userAnswers
        })
    } catch (error) {
        console.log(e)
        res.status(500)
            .json({
                error: "Something went wrong",
                message: "Couldn't load answers"
            })
    }


})
router.post("/multiple", userAuth, async (req, res)=>{
    try{
        const {user} = req
        const allAnswers = req.body.answers.map((ans)=>{
            return {answer: ans.answer, questionId: ans.questionId, answer_by: user._id}
        });

        await Answer.collection.insertMany(allAnswers)

        res.status(200)
            .json({
                msg: "Saved successfully"
            })
    }catch(e)   {
        console.log(e)
        res.status(500)
            .json({
                error: "Something went wrong",
                message: e
            })
    }
    
})

module.exports = router