const textInput = document.getElementById('textInput');
const submitBtn = document.getElementById('submitBtn');
const outputDiv = document.getElementById('output');
const btnPiedra = document.getElementById('piedra');
const btnPapel = document.getElementById('papel');
const btnTijera = document.getElementById('tijera');
const scoreSp = document.getElementById('score');
const bannedWords = ['asesinato', 'masacre', 'suicido', 'canibal', 'decapitar', 'matar', 'cadaver', 'matanza', 'crucificado','fascista', 'nazi', 'esclavo','hitler']

let userScore = 0;
let comScore = 0;

submitBtn.addEventListener('click', () => {
    const inputText = textInput.value;
    const containBw = bannedWords.some(word => inputText.toLowerCase().includes(word.toLowerCase()));

    if (inputText.trim() !== '' && inputText.length <= 20 && !containBw) {
        outputDiv.textContent = inputText;
        textInput.style.display = 'none';
        submitBtn.style.display = 'none';
    } else if (containBw) {
        alert('Por favor, ingrese un usuario sin palabras prohibidas.');
    } else {
        alert('Por favor, ingrese un usuario válido de hasta 20 caracteres.');
    }
});

btnPiedra.addEventListener('click', () => play('piedra'));
btnPapel.addEventListener('click', () => play('papel'));
btnTijera.addEventListener('click', () => play('tijera'));

function play(userChoice) {
    const choice = ['piedra', 'papel', 'tijera'];
    const comChoice = choice[Math.floor(Math.random() * 3)];

    let result;
    if (textInput.value.trim() === '') {
        alert('Por favor, escriba un usuario antes de interactuar.');
    } else if (userChoice === comChoice) { 
        result = 'Empate';
    } else if (
        (userChoice === 'piedra' && comChoice === 'tijera') || 
        (userChoice === 'papel' && comChoice === 'piedra') ||
        (userChoice === 'tijera' && comChoice === 'papel')
    ) {
        result = 'Ganaste';
        userScore++;
    } else {
        result = 'Perdiste';
        comScore++;
    }

    scoreSp.textContent = `${userScore} - ${comScore}`;
}