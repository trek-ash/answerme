import React, { Fragment, useState, useEffect } from 'react'
import "./questions.css"
import QuestionAPI from '../../services/question'
import AnswerAPI from '../../services/answer'
import Question from './Question'
const Questions = (props) => {
    const [questions, updateQuestions] = useState([]);
    const [userAnswer, updateUserAnswers] = useState([])

    const [filteredQuestions, updateFilteredQuestions] = useState([])
    const [filter, updateFilter] = useState("All")

    useEffect(() => {
        if(filter=="All")
            updateFilteredQuestions(questions)
        else {
            let newfilteredQuestions = questions.filter(question=>question.category==filter)
            updateFilteredQuestions(newfilteredQuestions)
        }   
    }, [filter])
    useEffect(() => {
        QuestionAPI.allQuestions()
        .then((res)=>{
            updateQuestions(res.data.questions)
            updateFilteredQuestions(res.data.questions)
        }, (err)=>{
            console.log(err)
        })
        const token = localStorage.getItem("auth")

        AnswerAPI.getUserAnswers(token)
        .then(res=>{
            // console.log(res)
            // if(res.data)    {
            //     const userAnswers = res.data?.answers.map(answer=>{
            //         return {answer: answer.answer, questionId: answer.questionId}
            //     })
            //     updateUserAnswers(userAnswers)
            // }
        })
        .catch(err=>{
            console.log(err)

        })
        // getStats()
    }, [])

    
    const submit = () => {
        const token = localStorage.getItem("auth")
        AnswerAPI.multipleAnswers({answers: userAnswer}, token)
        .then(res=>{
            console.log(res)
            alert("Answers saved successfully")
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong")

            
        })
    }
    
    const saveAnswer = (questionId, answer)=> {
        const userAnswers = [...userAnswer]
        let isPresent = false;
        userAnswers.forEach(ua=>{
            if(ua.questionId==questionId)   {
                ua.answer=answer
                isPresent = true;
            }
        })
        
        if(!isPresent)
            userAnswers.push({answer, questionId})

        updateUserAnswers(userAnswers)
    }
    return(
        <Fragment>
            <div className="container">
                <div className="float-right mt-4">

			        Question category: 
                    <select onChange={($event)=>updateFilter($event.target.value)}>
                        <option value="All">All</option>
                        <option value="Threat Hunting">Threat Hunting</option>
                        <option value="Vulnerability Management">Vulnerability Management</option>
                    </select>
                </div>
                <div style={{clear: "both"}}></div>
                {filteredQuestions.map(question=><Question saveAnswer={saveAnswer} key={question._id} question={question}/>)} 

                <button className="btn btn-success mt-5" onClick={submit}>Save Answers</button>
            </div>
		</Fragment>
    )
}

export default Questions