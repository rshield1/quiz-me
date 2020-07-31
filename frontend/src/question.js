class Question {
    constructor(content){
    this.content = content;
    }


    addQuestion(){
        questionsList.push(this)
    }


    // render and build question
    // renderQuestions(){
    //     questionElement.innerText = question.question
    //     question.answers.forEach(answer => {
    //         const button = document.createElement('button')
    //         button.innerText = answer.text
    //         button.classList.add('btn')

    //         if (answer.correct == true) {
    //             button.dataset.correct = answer.correct
    //         }
    //         button.addEventListener('click', selectAnswer)
    //         answerButtons.appendChild(button)
    //     })

    // }


}