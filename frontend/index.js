document.addEventListener("DOMContentLoaded", () =>{
    createUserform()
    grabUsers()
    


})
let currentUser = undefined
const BASE_URL = "http://localhost:3000/"

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

    
    // create users and stop the default submit behavior with event listener
function createUserform() {
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML +=
        `
        <form>
        Enter You Name: <input type="text" id="username">
        <input type="submit" class="btn" value="Add Name">
        </form>

        `
        usersForm.addEventListener("submit", userSubmittion)
}

function userSubmittion() {
// grab values from user form
        let username = document.getElementById("username").value
        let total = 0
        console.log(username)

        let user = {
            username: username,
            total: total
        }

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

            currentUser = u
            debugger;
            u.renderUser();
        })
        
        
    }


    // delete users

    function deleteUser() {
        let userID = parseInt(event.target.dataset.id)
        fetch(`${BASE_URL}/users/${userID}`, {
            method: 'DELETE'
        })
        // reload the window
        this.location.reload()
    }

    const BONUS = 10;
    const startButton = document.getElementById("start-btn")
    const nextButton = document.getElementById("next-btn")
    const questionsElement = document.getElementById("question-container")
    const questionElement = document.getElementById("question")
    const answerButtons = document.getElementById("answer-buttons")
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        nextQuestion()
    })
    let score = 0
    let shuffleQuestions , currentQuestionIndex
    const questions = [
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

    


    function startGame(){
        console.log('heeeyyy')
        startButton.classList.add('hide')
        shuffleQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionsElement.classList.remove("hide")
        nextQuestion()
    }

    function nextQuestion() {
        showQuestion(shuffleQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        resetState()
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
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
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }
        
    }


    function setStatusClass(element, correct){
        clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }


    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    
