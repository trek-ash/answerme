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

module.exports = router