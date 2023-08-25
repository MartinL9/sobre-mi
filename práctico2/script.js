const pInput = document.getElementById('pInput');
const iconInput = document.getElementById('iconInput');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const outputDiv = document.getElementById('output');
const btnPiedra = document.getElementById('piedra');
const btnPapel = document.getElementById('papel');
const btnTijera = document.getElementById('tijera');
const scoreSp = document.getElementById('score');
const resultP = document.getElementById('result');
const spanWin = document.getElementById('spanWin');
const spanLose = document.getElementById('spanLose');
const spanTotal = document.getElementById('spanTotal');
const resetAllInfo = document.getElementById('resetAll');
const bannedWords = ['asesinato', 'masacre', 'suicido', 'canibal', 'decapitar', 'matar', 'cadaver', 'matanza', 'crucificado','fascista', 'nazi', 'esclavo','hitler']

let userName = '';
let userScore = 0;
let comScore = 0;
let totalRounds = 0;
let userWins = 0;
let userLosses = 0;
let totalGames = 0;

disableButtonsChoice();

function disableButtonsChoice() {
    btnPiedra.setAttribute('disabled', true);
    btnPapel.setAttribute('disabled', true);
    btnTijera.setAttribute('disabled', true);
}

function enableButtonsChoice() {
    btnPapel.removeAttribute('disabled');
    btnPiedra.removeAttribute('disabled');
    btnTijera.removeAttribute('disabled');
}

function showResetBtn() {
    restartBtn.style.display = 'block';
}

function clearResult() {
    while(resultP.firstChild) {
        resultP.removeChild(resultP.firstChild);
    }
}

function resetGame() {
    userScore = 0;
    comScore = 0;
    totalRounds = 0;
    scoreSp.textContent = '0 - 0';
    resultP.textContent = '';
    restartBtn.style.display = 'none';
    enableButtonsChoice();
}

function resetAll() {
    resetGame();
    userName = '';
    userWins = 0;
    userLosses = 0;
    totalGames = 0;
    spanWin.innerHTML = '<i class="fa-solid fa-crown crown"></i>';
    spanLose.innerHTML = '<i class="fa-solid fa-x x"></i>';
    spanTotal.innerHTML = '';
    outputDiv.textContent = 'TU';
    pInput.style.display = 'inline';
    iconInput.style.verticalAlign = 'middle';
    iconInput.style.marginTop = '27px';
    iconInput.style.display = 'inline-block';
    textInput.style.display = 'flex';
    submitBtn.style.display = 'flex';
}

function userSubmission() {
    const inputText = textInput.value;
    const containBw = bannedWords.some(word => inputText.toLowerCase().includes(word.toLowerCase()));

    if (inputText.trim() !== '' && inputText.length <= 20 && !containBw) {
        userName = inputText;
        outputDiv.textContent = inputText;
        pInput.style.display = 'none';
        iconInput.style.display = 'none';
        textInput.style.display = 'none';
        submitBtn.style.display = 'none';
        enableButtonsChoice();
    } else if (containBw) {
        alert('Por favor, ingrese un usuario sin palabras prohibidas.');
    } else {
        alert('Por favor, ingrese un usuario válido de hasta 20 caracteres.');
    }
}

function comChoice() {
    const randomNumber = Math.floor(Math.random() * 3);

    let comChoice;
    switch (randomNumber) {
        case 0: 
            comChoice = 'piedra';
            console.log('case 0');
            break;
        case 1:
            comChoice = 'papel';
            console.log('case 1');
            break;
        case 2: 
            comChoice = 'tijera';
            console.log('case 2');
            break;
    } 
    return comChoice;
}

function playerChoice(play) {
    userChoice = play.toLowerCase();
    playGame();
}

function detWinner(resultPlayer, resultComp) {
    if (resultPlayer === resultComp) {
        return 'Empate';
    } else if (
        (resultPlayer === 'piedra' && resultComp === 'tijera') || 
        (resultPlayer === 'papel' && resultComp === 'piedra') ||
        (resultPlayer === 'tijera' && resultComp === 'papel')
    ){
        return 'Ganaste';
    } else {
        return 'Perdiste';
    }
}

function detResultWin(playerResult, compResult) {
    if(playerResult > compResult) {
        return userName;
    } else {
        return 'Computadora'
    }
}

let consecResults = 0;

function playGame() {
    let compPlay = comChoice();
    let result = detWinner(compPlay, userChoice);

    clearResult();

    if (totalRounds < 4) {
        resultP.textContent += 'El resultado fue: ' + result;
    }

    if(result === 'Ganaste') {
        userScore++;
    } else if(result === 'Perdiste') {
        comScore++;
    } else if(result === 'Empate') {
        return;
    }
    
    scoreSp.textContent = `${userScore} - ${comScore}`;
    totalRounds++;

    if(totalRounds === 5) {
        resultP.innerHTML = `El ganador fue: ` + detResultWin(userScore, comScore) + `<br>El juego ha terminado, Reinicie el juego para volver a jugar.`;
        disableButtonsChoice();
        showResetBtn();
        totalGames += 1;
        spanTotal.innerHTML = ` ${totalGames}`;

        if(detResultWin(userScore, comScore) === userName) {
            userWins++;
            spanWin.innerHTML = `<i class="fa-solid fa-crown crown"></i> ${userWins}`;
        } else {
            userLosses++;
            spanLose.innerHTML = `<i class="fa-solid fa-x x"></i> ${userLosses}`;
        }
    }
}

submitBtn.addEventListener('click', userSubmission); 
btnPiedra.addEventListener('click', () => playerChoice('piedra'));
btnPapel.addEventListener('click', () => playerChoice('papel'));
btnTijera.addEventListener('click', () => playerChoice('tijera'));
restartBtn.addEventListener('click', resetGame);
resetAllInfo.addEventListener('click', resetAll);