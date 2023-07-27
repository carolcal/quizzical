import React, { useState, useEffect } from 'react'

export default function Questions({ question, check, verifyAnswers }) {

    const [answers, setAnswers] = useState(question.answers)

    useEffect(() => {
        const verifyAnswer = answers.filter(answer => {
            let correctAnswer = (answer.isChosen && answer.isCorrect) === true
            return correctAnswer
        })
        if (verifyAnswer.length) {
            verifyAnswers(question.id, true)
        } else {
            verifyAnswers(question.id, false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers])

    const multipleChoice = answers.map((answer, index) => {
        function chooseAnswer(option) {
            setAnswers(oldChoice => oldChoice.map(answer => {
                return answer.text === option ?
                    { ...answer, isChosen: !answer.isChosen } :
                    { ...answer, isChosen: false }
            }))
        }
        return (
            <div key={index}>
                <button
                    className={answer.isChosen ? 'btn-selected' : 'btn-normal'}
                    onClick={() => chooseAnswer(answer.text)}
                >
                    {answer.text}
                </button>
            </div>
        )
    })

    const multipleChoiceAnswers = answers.map((answer, index) => {
        return (
            <div key={index}>
                <button className={
                    answer.isCorrect ?
                        'btn-correct' :
                        answer.isChosen && !answer.isCorrect ?
                            'btn-incorrect' :
                            'btn-null'}>
                    {answer.text}
                </button>
            </div>
        )
    })

    return (
        <div className='question-unit'>
            <p className='pill'>
                Category: {question.category}
                <strong> | </strong>
                Difficulty: {question.difficulty}
            </p>
            <h5>{question.question}</h5>
            <div className='question-unit-options'>
                {check ? multipleChoiceAnswers : multipleChoice}
            </div>
        </div>
    )
}