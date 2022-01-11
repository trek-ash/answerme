const router = require('express').Router();
const Question = require("../models/Questions");
router.get("/", async (req, res)=>{
    try{
        const questions = await Question.find();
        res.status(200)
            .json({
                questions
            })
    }catch(e)   {
        res.status(500)
            .json({
                error: "Something went wrong"
            })
    }
    
})

module.exports = router;