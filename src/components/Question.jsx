import React, {useState, useEffect} from 'react'

export default function Questions(props) {

    const [choices, setChoices] = useState(props.question.choices)

    useEffect(()=>{
        const verifyAnswer = choices.filter(choice => {
            let correctAnswer = (choice.selected && choice.correctAnswer) === true
            return correctAnswer
        })
        if(verifyAnswer.length){
            props.verifyAnswers(props.question.id, true)
        } else {
            props.verifyAnswers(props.question.id, false)
        }
    }, [choices])

    const multipleChoice = choices.map((choice, index) => {
        function chooseAnswer(option) {
            setChoices(oldChoice => oldChoice.map(choice => {
                return choice.option === option ?
                {...choice, selected: !choice.selected} :
                {...choice, selected: false}
            }))
        }
        return (
            <div key={index}>
                <button
                    className={choice.selected ? 'btn-selected' : 'btn-normal'}
                    onClick={() => chooseAnswer(choice.option)}
                >
                    {choice.option}
                </button>
            </div>
        )
    })

    const multipleChoiceAnswers = choices.map((option, index) => {
        return (
            <div key={index}>
                <button className={
                    option.correctAnswer ?
                        'btn-correct' :
                        option.selected && !option.correctAnswer ?
                            'btn-incorrect' :
                            'btn-null'}>
                    {option.option}
                </button>
            </div>
        )
    })

    return (
        <div className='question-unit'>
            <h3>{props.question.question}</h3>
            <div className='question-unit-options'>
                {props.check ? multipleChoiceAnswers : multipleChoice}
            </div>
            <hr />
        </div>
    )
}