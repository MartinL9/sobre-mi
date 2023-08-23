const pInput = document.getElementById('pInput');
const iconInput = document.getElementById('iconInput');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const outputDiv = document.getElementById('output');
const btnPiedra = document.getElementById('piedra');
const btnPapel = document.getElementById('papel');
const btnTijera = document.getElementById('tijera');
const scoreSp = document.getElementById('score');
const resultP = document.getElementById('result');
const bannedWords = ['asesinato', 'masacre', 'suicido', 'canibal', 'decapitar', 'matar', 'cadaver', 'matanza', 'crucificado','fascista', 'nazi', 'esclavo','hitler']

let userScore = 0;
let comScore = 0;
let userName = '';
let totalRounds = 0;

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

function playGame() {
        let compPlay = comChoice();
        let result = detWinner(compPlay, userChoice);

        resultP.textContent += 'El resultado fue: ' + result + '\n';

        if(result === 'Ganaste') {
            userScore++;
        } else if(result === 'Perdiste') {
            comScore++;
        } else if(result === 'Empate') {
            return;
        }
    
    scoreSp.textContent = `${userScore} - ${comScore}`;
    totalRounds++;

    if (totalRounds === 5) {
        resultP.textContent += `El juego ha terminado. Puntuación final para ${userName}: ${userScore} - ${comScore} Computadora.\nReinicie el juego para volver a jugar.`;
        disableButtonsChoice();
    }
    
}

submitBtn.addEventListener('click', userSubmission); 
btnPiedra.addEventListener('click', () => playerChoice('piedra'));
btnPapel.addEventListener('click', () => playerChoice('papel'));
btnTijera.addEventListener('click', () => playerChoice('tijera'));