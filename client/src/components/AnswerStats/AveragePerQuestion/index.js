import React, {useEffect, useState} from 'react';

const AveragePerQuestionStats = (props) => {
    
    useEffect(() => {
    }, [])
    return(
        <div className="container mt-3">
            <h4>Average Per Question</h4>
            {props.averagePerQuestionStats?.map(stat=>{
                return (
                    <div>
                        <strong>Q: {stat.questionId.description}</strong>
                        <div className="ml-5">
                           Average score <strong>{stat.average}</strong>

                        </div>
                    </div>
                )
            })}
        </div>
    )
    
}

export default AveragePerQuestionStats