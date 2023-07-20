import React from 'react'
import Question from './Question'

export default function Questions(props) {

    const questionElement = props.questions.map((question, index) => {
        return (
            <div key={index}>
                <Question question={question} />
            </div>
        )
    })

    return (
        <div>
            {questionElement}
        </div>
    )
}