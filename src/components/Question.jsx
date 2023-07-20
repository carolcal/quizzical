import React from 'react'

export default function Questions(props){

    const multipleChoice = props.question.options.map((option, index) => {
        return(
            <div key={index}>
                <button className=''>{option}</button>
            </div>
        )
    })

    return (
        <div className='question-unit'>
            <h4>{props.question.question}</h4>
            <div className='question-unit-options'>
            {multipleChoice}
            </div>
        </div>
    )
}