import React, { useState } from 'react';
import Initial from './components/Initial.jsx';
import Questions from './components/Questions.jsx'
import './App.css';

function App() {

    const [questions, setQuestions] = useState([])

    async function getQuestions() {
        let quizResponse = []
        await fetch('https://opentdb.com/api.php?amount=5')
            .then(response => response.json())
            .then(data => {
                quizResponse = data.results
                for(let response of quizResponse){
                    console.log(response.incorrect_answers)
                    console.log(response.correct_answer)
                    response.options = [...response.incorrect_answers]
                    response.options.push(response.correct_answer)
                }
            })

        setQuestions(quizResponse)
        console.log(quizResponse)
    }

    return (
        <main>
            {questions.length === 0 && <Initial getQuestions={getQuestions} />}
            {questions.length > 0 && <Questions questions={questions} />}
        </main>
    );
}

export default App;
