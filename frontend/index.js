    document.addEventListener("DOMContentLoaded", () =>{
        createUserform()
        grabUsers()
        grabQuestions()
        grabAnswers()
        
    })

    const BASE_URL = "http://localhost:3000/"
    const BONUS = 10;
    const MAX_QUESTIONS = 3;
    const startButton = document.getElementById("start-btn")
    const nextButton = document.getElementById("next-btn")
    const questionsElement = document.getElementById("question-container")
    const questionElement = document.getElementById("question")
    const answerButtons = document.getElementById("answer-buttons")

    let currentUser = undefined
    let hudUser = document.getElementById("hud-user")
    let usersDiv = document.getElementById("users-info")
    let usersForm = document.getElementById("users-form")
    let quizContainer = document.getElementById("quiz-container")
    let score = document.getElementById("hud-score")
    const questionsList = []
    const answersList = []
    let shuffleQuestions , currentQuestionIndex
    let questionCounter = document.getElementById("question-counter")
    let questions = [
            {
                question: "How do locate an element by it's in Javascript?",
                answers: [
                    { text: 'getElementByID', correct: true },
                    { text: 'querySelectorAll', correct: false },
                    { text: 'getElementByClassName', correct: false },
                    { text: 'cant find it by the id', correct: false }

                ]
            },
            {
                question: "How do you add js to your html page?",
                answers: [
                    {text: "<script href='xxx.js'>", correct: false},
                    {text: "<script name='xxx.js'>", correct: false},
                    {text: "<script src='xxx.js'>", correct: true},
                    {text: "<script file='xxx.js'>", correct: false}
                ]
                
            
            },
            {
                question: "How do you write 'Hello World' in your console?",
                answers: [
                    {text: "msgBox('Hello World');", correct: false},
                    {text: "console.logBox('Hello World');", correct: false},
                    {text: "msg('Hello World');", correct: false},
                    {text: "console.log('Hello World');", correct: true}
                ]
                
            
            }
        ]
    // read users so I will create FETCH request!!!

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
                    d.addQuestion();
                }
            })
                
        }
        function grabAnswers() {
            fetch(`${BASE_URL}/answers`)
            .then(res => res.json())
            .then(answers =>{
                for (let answer of answers){
                    let a = new Answer(answer.text, answer.correct)
                    a.addAnswer();
                }
            })
                
        }



    // create users and stop the default submit behavior with event listener
    function createUserform() {
    // let usersForm = document.getElementById("users-form")
        usersForm.innerHTML +=
        `
        <form id="user-form">
        Enter You Name: <input type="text" id="username">
        <input type="submit" class="btn" value="Add Name">
        </form>

        `
        usersForm.addEventListener("submit", userSubmittion)
    }
    // submit user
    function userSubmittion() {
// grab values from user form
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
            u.renderUser();
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
        hudUser.innerText = "Create A User"
       
    }

    
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        nextQuestion()
    })
    function startGame(){
        startButton.classList.add('hide')
        shuffleQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionsElement.classList.remove("hide")
        nextQuestion()
    }

    function nextQuestion() {
        showQuestion(shuffleQuestions[currentQuestionIndex])
        questionCounter.innerText = `Question ${[currentQuestionIndex + 1]}/${MAX_QUESTIONS}`
    }

    function showQuestion(question) {
        resetState()
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')

            if (answer.correct == true) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtons.appendChild(button)
        })
    }

    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild)
        }
        
    }
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
            startButton.innerText = 'Save Score'
            //will implement score save into database

            
            startButton.classList.remove('hide')
        }
        
    }


    function setStatusClass(element, correct){
        clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
            score.innerText = BONUS
        } else {
            element.classList.add('wrong')
            score.innerText = 0
        }
    }


    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

   incrementScore = (num) =>{
       score += num;
       score.innerText = score
   }
    

// let questionsAnswers = (questionsList, answersList) => {
//     questionsList[0]["answers"] = answersList.slice(0,4)
//     questionsList[1]["answers"] = answersList.slice(4,8)
//     questionsList[2]["answers"] = answersList.slice(8,12)

//     console.log(questionsList)
//     questions = questionsList
// }
