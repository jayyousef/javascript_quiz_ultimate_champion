const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 60
let questionCounter = 0
let availableQuestions = []
// let timerObject

let questions = [
    {
        question: 'Which company created Javascript',
        choice1: 'Microsoft',
        choice2: 'Sun Microsystems',
        choice3: 'Oracle',
        choice4: 'Netscape',
        answer: 4,
    },
    {
        question:"How long did it take the creator of Javascript from start to finish?",
        choice1: "10 Days",
        choice2: "2 Weeks",
        choice3: "2 Months",
        choice4: "10 Months",
        answer: 1,
    },
    {
        question: "Under what other name has JavaScript been released?",
        choice1: "Latte",
        choice2: "Mocha",
        choice3: "Timothy",
        choice4: "PoopooScript",
        answer: 2,
    },
    {
        question: "Which other programming language is considered to be better than Javascript?",
        choice1: "Python",
        choice2: "C+",
        choice3: ".net",
        choice4: "Any other language",
        answer: 4,
    }
]

const SCORE_POINTS = 100
let MAX_QUESTIONS = 4
//when you start the question
//start the question at 0 array
//check the available questions
//start the countdown timer
//then start the question
startGame = () => {
    questionCounter = 0
    score = 60
    availableQuestions = [...questions]
    startTimer()
    getNewQuestion()
}


function timerIncrement() {
    scoreText.textContent = score
    score--
    console.log(score)
    if (score <= 0) {
        score === 0
        clearInterval(timer)
        localStorage.setItem('mostRecentScore', score)
        window.location.assign('end.html')


        //TODO create function that ends the game
        if (shuffledQuestions.length == currentQuestionIndex)
            clearInterval(timerObject)
    }
}

function startTimer(){
timer = setInterval(timerIncrement, 1000)
}

function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width == 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }


getNewQuestion = () => {
    //when there are no more questions available
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//add event listener delegation for all options
//only runs the function if there are questions left
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'incorrect') {
            score = score - 10
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

// incrementScore = num => {
//     score +=num
//     scoreText.innerText = score
// }

startGame()

