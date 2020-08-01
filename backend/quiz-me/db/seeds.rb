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
Answer.destroy_all
10.times do
    User.create(username: Faker::Games::SuperSmashBros.fighter, total: rand(10...100))
end

quiz1 = Quiz.create(name: "Js Quiz")
    question1 = Question.create(content: "How do locate an element by it's ID in Javascript?", quiz_id: quiz1.id)
        answer1 = Answer.create(text: 'getElementByID', correct: true, question_id: question1.id)
        answer2 = Answer.create(text: 'querySelectorAll', correct: false, question_id: question1.id)
        answer3 = Answer.create(text: 'getElementByClassName', correct: false, question_id: question1.id)
        answer4 = Answer.create(text: 'cant find it by the id', correct: false, question_id: question1.id)

    question2 = Question.create(content: "How do you add js to your html page?", quiz_id: quiz1.id)
        answer5 = Answer.create(text: "<script href='xxx.js'>", correct: false, question_id: question2.id)
        answer6 = Answer.create(text: "<script name='xxx.js'>", correct: false, question_id: question2.id)
        answer7 = Answer.create(text: "<script src='xxx.js'>", correct: true, question_id: question2.id)
        answer8 = Answer.create(text: "<script file='xxx.js'>", correct: false, question_id: question2.id)

    question3 = Question.create(content: "How do you write 'Hello World' in your console?", quiz_id: quiz1.id)
        answer9 = Answer.create(text: "msgBox('Hello World');", correct: false, question_id: question3.id)
        answer10 = Answer.create(text: "console.logBox('Hello World');", correct: false, question_id: question3.id)
        answer11 = Answer.create(text: "msg('Hello World');", correct: false, question_id: question3.id)
        answer12 = Answer.create(text: "console.log('Hello World');", correct: true, question_id: question3.id)


# Question.create(content: "How do locate an element by it's in Javascript?",
#         answers: [
#             { text: 'getElementByID', correct: true },
#             { text: 'querySelectorAll', correct: false },
#             { text: 'getElementByClassName', correct: false },
#             { text: 'cant find it by the id', correct: false }

#         ]
#     },
#     {
#         question: "How do you add js to your html page?",
#         answers: [
#             {text: "<script href='xxx.js'>", correct: false},
#             {text: "<script name='xxx.js'>", correct: false},
#             {text: "<script src='xxx.js'>", correct: true},
#             {text: "<script file='xxx.js'>", correct: false}
#         ]
        
    
#     },
#     {
#         question: "How do you write 'Hello World' in your console?",
#         answers: [
#             {text: "msgBox('Hello World');", correct: false},
#             {text: "console.logBox('Hello World');", correct: false},
#             {text: "msg('Hello World');", correct: false},
#             {text: "console.log('Hello World');", correct: true}
#         ]
        
    
#     }
# ]
#     )


