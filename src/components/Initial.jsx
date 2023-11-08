import { useState } from 'react'
import Select from 'react-select'

export default function Initial(props) {

    const [optionsCategories, setOptionsCategories] = useState(importCategories)

    async function importCategories() {
        let trivia_categories = []
        await fetch(`https://opentdb.com/api_category.php`)
            .then(response => response.json())
            .then(data => {
                trivia_categories = data.trivia_categories.map(category => {
                    return { value: category.id, label: category.name }
                })
            })
        setOptionsCategories(trivia_categories)
    }

    const optionsDifficulty = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ]

    const optionsNumbers = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
    ]




    return (
        <div className='initial-page'>
            <h1>Quizzical</h1>
            <h4>Let's see if you can answer this questions!</h4>
            <p>Choose (or don't) any category you wish. </p>
            <p>Filter the level of difficulty. </p>
            <p>Determine the number of questions.</p>
            <h4>But mostly... Have Fun!</h4>
            <div className='form'>
            {optionsCategories.length &&
                <Select
                    options={optionsCategories}
                    placeholder="Select Category"
                    className="form-select-multi"
                    onChange={(event) => props.setSelectedCategory(event)}
                />
            }
            <div className='inline-form'>
                <Select
                    options={optionsDifficulty}
                    placeholder="Select Difficulty"
                    className="form-select"
                    onChange={(event) => props.setSelectedDifficulty(event)}
                />
                <Select
                    options={optionsNumbers}
                    placeholder="Select Number of Questions"
                    className="form-select"
                    onChange={(event) => props.setSelectedNumber(event)}
                    value={props.selectedNumber}
                />

            </div>
            <button className='btn-main' onClick={() => props.getQuestions()}>START QUIZ!</button>
            </div>
        </div>
    )
}