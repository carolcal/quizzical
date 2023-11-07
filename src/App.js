import React, { useState } from 'react';
import Initial from './components/Initial.jsx';
import Questions from './components/Questions.jsx'
import { nanoid } from 'nanoid';


function App() {

    const [questions, setQuestions] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedDifficulty, setSelectedDifficulty] = useState()
    const [selectedNumber, setSelectedNumber] = useState({ value: 5, label: '5' })

    async function getQuestions() {
        let he = require('he');
        let quizResponse = []
        const amount = `amount=${selectedNumber.value}`
        const category = selectedCategory ? `&category=${selectedCategory.value}` : ''
        const difficulty = selectedDifficulty ? `&difficulty=${selectedDifficulty.value}` : ''
        const url = `https://opentdb.com/api.php?${amount}${category}${difficulty}`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                quizResponse = data.results.map(element => {
                    return {
                        id: nanoid(),
                        question: he.decode(element.question),
                        category: element.category,
                        difficulty: element.difficulty,
                        answers: [
                            ...element.incorrect_answers.map(answer => ({
                                text: he.decode(answer),
                                isCorrect: false,
                                isChosen: false,

                            })),
                            {
                                text: he.decode(element.correct_answer),
                                isCorrect: true,
                                isChosen: false,
                            },
                        ].sort(() => 0.5 - Math.random())
                    }
                })
            })
        setQuestions(quizResponse)
    }

    function resetQuestions() {
        setQuestions()
        setSelectedCategory()
        setSelectedDifficulty()
        setSelectedNumber({ value: 5, label: '5' })
    }

    return (
        <main>
            {!questions &&
                <Initial
                    getQuestions={getQuestions}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedDifficulty={setSelectedDifficulty}
                    setSelectedNumber={setSelectedNumber}
                    selectedNumber={selectedNumber}
                />
            }
            {questions && <Questions
                questions={questions}
                resetQuestions={resetQuestions}
                setQuestions={setQuestions}
                amount={selectedNumber.value}
            />}
        </main>
    );
}

export default App;
