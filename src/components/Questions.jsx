import React, { useState } from 'react'
import Question from './Question'
import Confetti from 'react-confetti'

export default function Questions(props) {

    const [check, setCheck] = useState(false)

    const [count, setCount] = useState()

    function countPoints() {
        setCheck(prev => !prev)
        let contagem = 0
        for (const question of props.questions) {
            if (question.correct_answer) {
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
            <Question
                key={index}
                question={question}
                check={check}
                verifyAnswers={verifyAnswers}
            />
        )
    })

    return (
        <div className='question-page'>
            <div className='question-elements'>
                {questionElement}
            </div>
            {check ?
                <div>
                    {count === 5 && <Confetti numberOfPieces={800}/>}
                    {count === 0 && <h4>You scored {count}/5 correct answers. Hope you go better the next time.</h4>}
                    {(count > 0 && count < 5) && <h4>You scored {count}/5 correct answers. Keep Practicing!</h4>}
                    {count === 5 && <h4>Congratulations! You got everything rigth!</h4>}
                    <button className='btn-main' onClick={() => props.resetQuestions()}>New Game</button>
                </div>
                :
                <button className='btn-main' onClick={countPoints}>Check Answers</button>}
        </div>
    )
}