# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Quiz.destroy_all
Question.destroy_all
10.times do
    User.create(username: Faker::Games::SuperSmashBros.fighter, total: 0)
end

Question.create(questions:[
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
    )


