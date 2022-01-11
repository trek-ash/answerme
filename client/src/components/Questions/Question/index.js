import React, { Fragment, useState, useEffect } from 'react'
import "./question.css"
import Options from '../Options'
const Question = (props) => {
    useEffect(() => {
        
    }, [])

    const onAnswer = (questionId, answer) => {
        props.saveAnswer(questionId, answer)
    }  
    return(
        <Fragment>
			<div className="mt-3">
                <strong>Q.</strong> {props.question.description}
            </div> 
            <div className="options">
               <strong>Your Answer:</strong> <Options optionName={props.question._id} onAnswer={onAnswer}/>
            </div>
		</Fragment>
    )
}

export default Question