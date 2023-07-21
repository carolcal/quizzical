import React, { useState } from 'react'
import Question from './Question'

export default function Questions(props) {

    const [check, setCheck] = useState(false)
    
    const [count, setCount] = useState()

    function countPoints() {
        setCheck(prev => !prev)
        let contagem = 0
        for(const question of props.questions){
            if(question.correct_answer){
                contagem++
            }
        }
        setCount(contagem)
    }

    function verifyAnswers(id, correct_answer) {
        props.setQuestions(oldQuestions => oldQuestions.map(question => {
            return question.id === id ?
                { ...question, correct_answer: correct_answer } :
                question
        }))
    }

    const questionElement = props.questions.map((question, index) => {

        return (
            <div key={index}>
                <Question
                    question={question}
                    check={check}
                    verifyAnswers={verifyAnswers}
                />
            </div>
        )
    })

    return (
        <div>
            {questionElement}
            {check ?
                <div>
                    <h3>You scored {count}/5 correct answers</h3>
                    <button className='btn-main' onClick={() => props.resetQuestions()}>New Game</button>
                </div>
                 :
                <button className='btn-main' onClick={countPoints}>Check Answers</button>}
        </div>
    )
}