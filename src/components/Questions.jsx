import { useState, useEffect, useRef } from 'react'
import Question from './Question'
import Confetti from 'react-confetti'

export default function Questions(props) {

    const [check, setCheck] = useState(false)

    const [count, setCount] = useState()

    const refContainer = useRef()

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
        }
    }, []);

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
        <div className='question-page' ref={refContainer}>
            <div className='question-elements'>
                {questionElement}
            </div>
            {check ?
                <div>
                    {count === props.amount && <Confetti numberOfPieces={800} width={dimensions.width} height={dimensions.height} />}
                    {count === 0 && <h4>You didn't scored anything :( Hope you go better the next time.</h4>}
                    {(count > 0 && count < props.amount) && <h4>You scored {count}/{props.amount} correct answers. Keep Practicing!</h4>}
                    {count === props.amount && <h4>Congratulations! You got everything rigth!</h4>}
                    <button className='btn-main' onClick={() => props.resetQuestions()}>New Game</button>
                </div>
                :
                <button className='btn-main' onClick={countPoints}>Check Answers</button>}
        </div>
    )
}