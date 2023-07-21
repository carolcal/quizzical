import React, { useState } from 'react';
import Initial from './components/Initial.jsx';
import Questions from './components/Questions.jsx'
import { nanoid } from 'nanoid';
import './App.css';

function App() {

    const [questions, setQuestions] = useState()

    async function getQuestions() {
        var he = require('he');
        let quizResponse = []
        await fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
            .then(data => {
                quizResponse = data.results
                for (const response of quizResponse) {
                    let options = [{
                        option: he.decode(response.correct_answer),
                        selected: false,
                        correctAnswer: true,
                    }]
                    for (const value of response.incorrect_answers) {
                        options.push({
                            option: he.decode(value),
                            selected: false,
                            correctAnswer: false
                        })
                    }
                    response.choices = options.sort(generateRandomOrder)
                    function generateRandomOrder(a, b) {
                        return 0.5 - Math.random();
                    }
                    response.id = nanoid()
                    delete response.incorrect_answers
                    delete response.correct_answer
                    response.question = he.decode(response.question)
                }
            })
        setQuestions(quizResponse)
    }

    function resetQuestions() {
        setQuestions()
    }

    return (
        <main>
            {!questions && <Initial getQuestions={getQuestions} />}
            {questions && <Questions
                questions={questions}
                resetQuestions={resetQuestions}
                setQuestions={setQuestions}
            />}
        </main>
    );
}

export default App;
