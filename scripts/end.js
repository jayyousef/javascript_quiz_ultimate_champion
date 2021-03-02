const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

//only shows the top 5 scores in the highscore page
const MAX_HIGH_SCORES = 5

//showing the final score in the DOM
finalScore.innerText = mostRecentScore

//prevents user from clicking 'save' until at least one key has been pressed
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

//using the object in the localStorage to display the users previous name and high scores
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')

    window.location.assign('./highscores.html')

    
}