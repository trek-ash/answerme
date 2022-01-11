import React, { Fragment, useState, useEffect } from 'react'
import "./questions.css"
import QuestionAPI from '../../services/question'
import Question from './Question'
const Questions = (props) => {
    const [questions, updateQuestions] = useState([]);
    const [userAnswer, updateUserAnswers] = useState([])

    const [filteredQuestions, updateFilteredQuestions] = useState([])
    const [filter, updateFilter] = useState("All")

    useEffect(() => {
        console.log(filter)
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
            console.log(res)
            updateQuestions(res.data.questions)
            updateFilteredQuestions(res.data.questions)
        }, (err)=>{
            console.log(err)
        })

    }, [])

    const submit = () => {

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
                {filteredQuestions.map(question=><Question key={question._id} question={question}/>)} 

                <button className="btn btn-success mt-5" onClick={submit}>Submit Answers</button>
            </div>
		</Fragment>
    )
}

export default Questions