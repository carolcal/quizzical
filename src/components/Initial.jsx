import React from 'react'

export default function Initial(props){

    return (
        <div className='initial-page'>
            <h1>Quizzical</h1>
            <p>Let's see if you can answer this questions!</p>
            <button onClick={() => props.getQuestions()}>START QUIZ!</button>
        </div>
    )
}