// VARIABLES
const pInput = document.getElementById('pInput');
const iconInput = document.getElementById('iconInput');
const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const outputSpan = document.getElementById('output');
const userPlay = document.getElementById('userChoice');
const computerPlay = document.getElementById('comChoice');
const vsSpan = document.getElementById('vsSpan');
const btnPiedra = document.getElementById('piedra');
const btnPapel = document.getElementById('papel');
const btnTijera = document.getElementById('tijera');
const scoreSp = document.getElementById('score');
const resultP = document.getElementById('result');
const spanWin = document.getElementById('spanWin');
const spanLose = document.getElementById('spanLose');
const spanTotal = document.getElementById('spanTotal');
const resetAllInfo = document.getElementById('resetAll');
const bannedWords = ['asesino', 'asesinato', 'masacre', 'suicido', 'canibal', 'decapitar', 'matar', 'cadaver', 'matanza', 'crucificado','fascista', 'nazi', 'esclavo','hitler']

let userName = '';
let userScore = 0;
let comScore = 0;
let totalRounds = 0;
let userWins = 0;
let userLosses = 0;
let totalGames = 0;

disableButtonsChoice();

// DESABILITA LOS BOTONES DE ELECCIÓN
function disableButtonsChoice() {
    btnPiedra.setAttribute('disabled', true);
    btnPapel.setAttribute('disabled', true);
    btnTijera.setAttribute('disabled', true);
}

// HABILITA LOS BOTONES DE ELECCIÓN
function enableButtonsChoice() {
    btnPapel.removeAttribute('disabled');
    btnPiedra.removeAttribute('disabled');
    btnTijera.removeAttribute('disabled');
}

// MUESTRA EL BOTÓN DE REINICIO DEL JUEGO
function showResetBtn() {
    restartBtn.style.display = 'block';
}

// ELIMINA LOS RESULTADOS DE LA RONDA ANTERIOR
function clearResult() {
    while(resultP.firstChild) {
        resultP.removeChild(resultP.firstChild);
    }
}

// FUNCION PARA REINICIAR EL JUEGO
function resetGame() {
    userScore = 0;
    comScore = 0;
    totalRounds = 0;
    scoreSp.textContent = '0 - 0';
    resultP.textContent = '';
    restartBtn.style.display = 'none';
    userPlay.textContent = '';
    computerPlay.textContent = '';
    vsSpan.textContent = '';
    enableButtonsChoice();
}

// FUNCION PARA REINICIAR TODA LA INFORMACIÓN DE USUARIO
function resetAll() {
    resetGame();
    userName = '';
    userWins = 0;
    userLosses = 0;
    totalGames = 0;
    spanWin.innerHTML = '<i class="fa-solid fa-crown crown"></i>';
    spanLose.innerHTML = '<i class="fa-solid fa-x x"></i>';
    spanTotal.innerHTML = '';
    outputSpan.textContent = 'TU';
    pInput.style.display = 'inline';
    iconInput.style.verticalAlign = 'middle';
    iconInput.style.marginTop = '27px';
    iconInput.style.display = 'inline-block';
    textInput.style.display = 'flex';
    submitBtn.style.display = 'flex';
    disableButtonsChoice();
}

// COMPROBACION DE ENTRADA DEL USUARIO
function userSubmission() {
    const inputText = textInput.value;
    const containBw = bannedWords.some(word => inputText.toLowerCase().includes(word.toLowerCase()));

    if (inputText.trim() !== '' && inputText.length <= 20 && !containBw) {
        userName = inputText;
        outputSpan.textContent = inputText;
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

// MUESTRA LAS ELECCIONES EN PANTALLA 
function showChoice(choice, isUser) {
    let flipClass = isUser ? 'fa-flip-horizontal' : '';
    if (choice === 'piedra') {
        return `<i class="fa-solid fa-hand-back-fist fa-7x ${flipClass} iRock"></i> <span class="icon-text sRockU sRockC">Piedra</span>`;
    } else if (choice === 'papel') {
        return `<i class="fa-solid fa-hand fa-7x ${flipClass} iPaper"></i> <span class="icon-textP sPaperU sPaperC">Papel</span>`;
    } else {
        return `<i class="fa-solid fa-hand-scissors fa-7x ${flipClass} iScissors"></i> <span class="icon-textT sScisU sScisC">Tijera</span>`;
    }
}

// ELECCION DE COMPUTADORA
function comChoice() {
    const randomNumber = Math.floor(Math.random() * 3);

    let comChoice;
    switch (randomNumber) {
        case 0: 
            comChoice = 'piedra';
            break;
        case 1:
            comChoice = 'papel';
            break;
        case 2: 
            comChoice = 'tijera';
            break;
    } 
    return comChoice;
}

// ELECCION DE JUGADOR
function playerChoice(play) {
    userChoice = play.toLowerCase();
    playGame();
}

// DETERMINAR GANADOR DE RONDA
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

// DETERMINAR GANADOR DE JUEGO
function detResultWin(playerResult, compResult) {
    if(playerResult > compResult) {
        return userName;
    } else {
        return 'Computadora'
    }
}

// MUESTRA EL CARTEL DEL GANADOR
function showWinner(winner) {
    const blurBackground = document.getElementById('blurBackground');
    const winnerBanner = document.getElementById('winnerBanner');
    const winnerName = document.getElementById('winnerName');

    winnerName.textContent = winner;

    blurBackground.style.display = 'block';
    winnerBanner.style.display = 'block';

    function hideWinnerBanner() {
        blurBackground.style.display = 'none';
        winnerBanner.style.display = 'none';
    }

    winnerBanner.addEventListener('click', function (e) {
        e.stopPropagation();
        hideWinnerBanner();
    });
}

// FUNCION PRINCIPAL DEL JUEGO
function playGame() {
    let compPlay = comChoice();
    let result = detWinner(userChoice, compPlay);

    clearResult();

    if (totalRounds < 4) {
        resultP.textContent += 'El resultado fue: ' + result;
    }

    if(result === 'Ganaste') {
        userScore++;
    } else if(result === 'Perdiste') {
        comScore++;
    } else if(result === 'Empate') {
        resultP.innerHTML = 'Empate';
        totalRounds--;
    }
    
    userPlay.classList.add('collisionUser');
    computerPlay.classList.add('collisionCom');

    userPlay.innerHTML = showChoice(userChoice, true);
    computerPlay.innerHTML = showChoice(compPlay, false);
    vsSpan.innerText = 'VS';
    scoreSp.textContent = `${userScore} - ${comScore}`;
    totalRounds++;

    if(userScore === 3 || comScore === 3) {
        const winner = detResultWin(userScore, comScore);
        showWinner(winner);
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

// EVENTOS
submitBtn.addEventListener('click', userSubmission); 
btnPiedra.addEventListener('click', () => playerChoice('piedra'));
btnPapel.addEventListener('click', () => playerChoice('papel'));
btnTijera.addEventListener('click', () => playerChoice('tijera'));
restartBtn.addEventListener('click', resetGame);
resetAllInfo.addEventListener('click', resetAll);