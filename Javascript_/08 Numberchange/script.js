

let secretNumber;
let attempts;
let gameEnded = false;

const guessInput = document.getElementById('guess-input');
const checkButton = document.getElementById('check-button');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');


function initializeGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameEnded = false;

    guessInput.value = '';
    messageElement.textContent = '';
    attemptsElement.textContent = attempts;
    guessInput.disabled = false;
    checkButton.disabled = false;
    resetButton.classList.add('hidden');
    guessInput.focus();
}



function checkGuess() {
    if (gameEnded) return;

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100.';
        messageElement.style.color = '#dc3545';
        return;
    }

    attempts++;
    attemptsElement.textContent = attempts;

    if (userGuess === secretNumber) {
        messageElement.textContent = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts!`;
        messageElement.style.color = '#28a745';
        endGame();
    } else if (userGuess < secretNumber) {
        messageElement.textContent = 'Too low! Try again.';
        messageElement.style.color = '#ffc107';
    } else {
        messageElement.textContent = 'Too high! Try again.';
        messageElement.style.color = '#ffc107';
    }
}

function endGame() {
    gameEnded = true;
    guessInput.disabled = true;
    checkButton.disabled = true;
    resetButton.classList.remove('hidden');
}

checkButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', initializeGame);

guessInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

initializeGame();