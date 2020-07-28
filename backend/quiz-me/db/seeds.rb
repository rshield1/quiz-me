# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Quiz.destroy_all
10.times do
    User.create(username: Faker::Games::SuperSmashBros.fighter, total: 0)
end

# Quiz.create(questions:
#         {
#             :question1 => "How do locate an element by it's in Javascript?",
#             # choice1: 'document.getElementByID',
#             # choice2: 'document.querySelectorAll',
#             # choice3: 'document.getElementByClassName',
#             # choice4: 'cant find it by the id',
#             :answer1 => 1
#         },
#         # {
#         #     question2
#         #         "How do you add js to your html page?",
#         #     choice1: "<script href='xxx.js'>",
#         #     choice2: "<script name='xxx.js'>",
#         #     choice3: "<script src='xxx.js'>",
#         #     choice4: "<script file='xxx.js'>",
#         #     answer: 3
#         # },
#         # {
#         #     question3 " How do you write 'Hello World' in your console?",
#         #     choice1: "msgBox('Hello World');",
#         #     choice2: "console.logBox('Hello World');",
#         #     choice3: "msg('Hello World');",
#         #     choice4: "console.log('Hello World');",
#         #     answer: 4
#         # }, 
#         :score => 0
#     )


