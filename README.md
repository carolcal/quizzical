# Quizzical App


## Description

This project is a quiz created using the Trivia Open API. Users can filter quiz questions based on their preferred category, difficulty level, and the number of questions they desire. To achieve this, the app imports all available categories from the Trivia API when the page is initially loaded.

After completing the quiz, users can view their score. Additionally, whenever a user answers all questions correctly, confetti appears to celebrate their success.

This is a frontend project and served as the final challenge of a React course I completed. One of the most challenging aspects of this project was organizing the data received from the API for use in the app. However, the most demanding part was the functionality that checked the answers and counted the correct ones. I had to use two different states, each with its respective function for state changes. I also had to pass one of the states and one of the functions as props from the parent component to the child component and receive answers from the child component to the parent. For someone who had just learned React, it was a rewarding experience.

Initially, the challenge was to render 5 random questions. However, after completing the specified requirements, I decided to incorporate a couple of additional features. The first was the addition of category, difficulty level, and the number of questions filters, providing the user's personalized experience. The second feature was the confetti that appears when the user answers all questions correctly, adding a fun element to make the experience more exciting.

You can access this project online at: https://master--quizzical-carol.netlify.app/


## How to use in localhost

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). After downloading it you can run locally in you machine running in your terminal:

### `npm install`
Install all the dependencies

### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

