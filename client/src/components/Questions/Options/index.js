import React, { Fragment, useState, useEffect } from 'react'
const Options = (props) => {
    const [options, updateOptions] = useState([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, -1])

    const [answer, updateAnswer] = useState(0)

    useEffect(() => {
        
        props.onAnswer(props.optionName, answer)
    }, [answer])
    return(
        <Fragment>
            <select 
                name={props.optionName}
                value={answer}
                className="ml-4"
                onChange={($event)=>{updateAnswer($event.target.value)}}>
                {
                    options.map(option=>{return (<option value={option}>{option}</option>)})
                }
                
            </select>
		</Fragment>
    )
}

export default Options