    //Load form and Users
        document.addEventListener("DOMContentLoaded", () =>{
            createUserform()
            grabUsers()
        })
    //Set all variables
        const BASE_URL = "http://localhost:3000/"
        const BONUS = 10;
        const MAX_QUESTIONS = 3;
        const instructionsTitle = document.getElementById("title")
        const instructionsBody = document.getElementById("instructions")
        const startButton = document.getElementById("start-btn")
        const nextButton = document.getElementById("next-btn")
        const questionsElement = document.getElementById("question-container")
        const questionElement = document.getElementById("question")
        const answerButtons = document.getElementById("answer-buttons")
        let questionsList = []
        let answersList = []
        let currentUser = undefined
        let hudUser = document.getElementById("hud-user")
        let usersDiv = document.getElementById("users-info")
        let usersForm = document.getElementById("users-form")
        let quizContainer = document.getElementById("quiz-container")
    
        let shuffleQuestions , currentQuestionIndex
        let questionCounter = document.getElementById("question-counter")
        // let newScore = 0
        // let score = document.getElementById("hud-score")
    //Fetching Functions for ALL USERS, QUESTIONS, and ANSWERS!
        function grabUsers() {
                fetch(`${BASE_URL}/users`)
                .then(res => res.json())
                .then(users =>{
                    for (let user of users){
                        let u = new User(user.id, user.username, user.total)
                        u.renderUser();
                    }
                })
            } 
        function grabQuestions() {
            fetch(`${BASE_URL}/questions`)
            .then(res => res.json())
            .then(data =>{
                for (let question of data){
                    let d = new Question(question.content)
                    d.addQuestion(questionsList);
                }
            })
                
        }
        grabQuestions()

        function grabAnswers() {
            fetch(`${BASE_URL}/answers`)
            .then(res => res.json())
            .then(answers =>{
                for (let answer of answers){
                    let a = new Answer(answer.text, answer.correct)
                    a.addAnswer(answersList);
                }
            })
                
        }
        grabAnswers()

    // create users and stop the default submit behavior with event listener
        function createUserform() {

            usersForm.innerHTML +=
            `
            <form id="user-form">
            Enter You Name: <input type="text" id="username">
            <input type="submit" class="btn" value="Add Name">
            </form>

            `
            usersForm.addEventListener("submit", userSubmittion)
        }

    // submit user and grab values from user form
        function userSubmittion() {
            event.preventDefault()
            let username = document.getElementById("username").value
            let usertotal = 0
            console.log(username)
            let user = {
                username: username,
                total: usertotal
            }
    // fetch post request to create user
        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
            let u = new User(user.id, user.username, user.total)
            u.renderUser()
            alert("You are now saved in the database")
            startButton.classList.remove("hide")
        })
            document.getElementById("user-form").reset()
    }

    // delete users
        function deleteUser() {
            let userID = parseInt(event.target.dataset.id)
            fetch(`${BASE_URL}/users/${userID}`, {
                method: 'DELETE'
            })
            event.target.previousElementSibling.remove()
            event.target.remove()
            alert("You are now deleted from the database")
            hudUser.innerText = "Create A User"
        
        }

    //Add event on start button
        startButton.addEventListener('click', startGame)
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++
            nextQuestion()
        })
    //Start Game Function
        function startGame(){
            startButton.classList.add('hide')
            instructionsBody.classList.add('hide')
            instructionsTitle.classList.add("hide")
            questionsAnswers(questionsList, answersList)  
            shuffleQuestions = questionsList.sort(() => Math.random() - .5)
            currentQuestionIndex = 0
            questionsElement.classList.remove("hide")
            nextQuestion()
        }
    //Next Question
        function nextQuestion() {
            showQuestion(shuffleQuestions[currentQuestionIndex])
            questionCounter.innerText = `Question ${[currentQuestionIndex + 1]}/${MAX_QUESTIONS}`
        }

    //Show Question
        function showQuestion(questionsList) {
            resetState()
            questionElement.innerText = questionsList.content
            questionsList.answers.forEach(answer => {
                const button = document.createElement('button')
                button.innerText = answer.text
                button.classList.add('btn')

                if (answer.correct) {
                    button.dataset.correct = answer.correct
                }
                button.addEventListener('click', selectAnswer)
                answerButtons.appendChild(button)
            })
        }
    //Reset State of Game
        function resetState() {
            clearStatusClass(document.body)
            nextButton.classList.add('hide')
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild)
            }
        
        }
    
    //Selecting an Answer

        function selectAnswer(e) {
            const selectedButton = e.target
            const correct = selectedButton.dataset.correct
            setStatusClass(document.body, correct)
            Array.from(answerButtons.children).forEach(button =>{
                setStatusClass(button, button.dataset.correct)
            })
            if (shuffleQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')  
            } else {
                startButton.innerText = 'Restart'
                //will implement score save into database
                startButton.classList.remove('hide')
            }
            
        }

    //Setting status Green or red depending on correct/incorrect    
        function setStatusClass(element, correct){
            clearStatusClass(element)
            if (correct) {
                element.classList.add('correct')
            } else {
                element.classList.add('wrong')
            }
        }

    //Clearing the Status

        function clearStatusClass(element) {
            element.classList.remove('correct')
            element.classList.remove('wrong')
        }

    //Used to increment score.  Will fix later
        incrementScore = (num) =>{
            newScore += num
            score.innerText = newScore
        }

    //Collect all questions & Answers in an Array
        function questionsAnswers(questionsList, answersList) {
            
            questionsList[0]["answers"] = answersList.slice(0,4)
            questionsList[1]["answers"] = answersList.slice(4,8)
            questionsList[2]["answers"] = answersList.slice(8,12)
            console.log("questionsList", ...questionsList)
        }

