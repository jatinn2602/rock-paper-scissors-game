//Prevent animation on reload
setTimeout(() => {
    document.body.classList.remove('preload'); // Use the correct class name if needed
},500);

//dom
const btnRules = document.querySelector('.rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')

const CHOICES = [
    { name:'paper', beats:'rock' },
    { name:'scissors', beats:'paper' },
    { name:'rock', beats:'scissors' },
    
]

const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game') // FIXED
const resultsDiv = document.querySelector('.results') // FIXED
const resultDivs = document.querySelectorAll('.results__result')

const resultWinner = document.querySelector('.results__winner')
const resultText = document.querySelector('.results__text')

const playAgainBtn= document.querySelector('.play-again')

const scoreNumber = document.querySelector('.score__number')
let score=0;

// Game logic
choiceButtons.forEach(button=>{
    button.addEventListener('click', () => { 
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName)
        choose(choice)
    })
})

function choose(choice){
    const aichoice= aiChoose()
    displayResults([choice, aichoice])
    displayWinner([choice, aichoice])
}

function aiChoose(){
    const rand =Math.floor(Math.random() * CHOICES.length)
    return CHOICES[rand]
}

function displayResults(results){
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
            <div class="choice ${results[idx].name}">
                <img src="assets/images/svg/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
            </div>`
        },idx*1000);
    })
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
};

function displayWinner(results){
    setTimeout(() => {
        const userWins= isWinner(results)
        const aiWins= isWinner(results.reverse())
        
        if(userWins){
            resultText.innerHTML = 'YOU WIN'
            resultDivs[0].classList.toggle('winner')
            keepScore(1)
        } else if(aiWins){
            resultText.innerHTML = 'YOU LOSE'
            resultDivs[1].classList.toggle('winner')
            keepScore(-1)
        } else{
            resultText.innerHTML = 'DRAW'
            keepScore(0)
        }
        
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('.show-winner');
        
    }, 1000);

}

function isWinner(results){
    return results[0].beats === results[1].name
}

function keepScore(point){
    score += point;
    scoreNumber.innerText = score;
}

// Play again
playAgainBtn.addEventListener('click',()=>{
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('winner');
    })
    resultText.inneText=""
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('.show-winner');
})

//Show/Hide modal
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
})
btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal')
})
