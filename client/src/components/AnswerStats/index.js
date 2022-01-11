import React, {useEffect, useState} from 'react';
import AnswerAPI from '../../services/answer'
import AveragePerQuestionStats from "./AveragePerQuestion"
const AnswerStats = () => {
    const [averagePerQuestions, setAveragePerQuestions] = useState([])

    useEffect(() => {
        getStats()
        
    }, [])

    const getStats = () => {
        AnswerAPI.getAveragePerQuestion()
        .then(res=>{
            console.log(res)
            setAveragePerQuestions(res.data.answers)

        })
        .catch(err=>{
            console.log(err)
        })
    }
   
    return(
        <>
            <AveragePerQuestionStats averagePerQuestionStats={averagePerQuestions}/>
        </>
    )
    
}

export default AnswerStats