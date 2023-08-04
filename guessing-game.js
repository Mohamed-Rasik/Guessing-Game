var name = '';
var numberToGuess = '';
var guessCount = 0;
var startTime;

document.getElementById('start').addEventListener('click', function() {
  name = prompt('Enter Your Name');
  numberToGuess = generateUniqueNumber();
  guessCount = 0;
  startTime = Date.now();
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('guessCount').textContent = '';
  document.getElementById('message').textContent = '';
});

document.getElementById('submit').addEventListener('click', function() {
  const guess = document.getElementById('guess').value;
  document.getElementById('message').textContent = getClue(numberToGuess, guess);
  guessCount++;
  document.getElementById('guessCount').textContent = 'My Guesses: ' + guessCount;
  if(numberToGuess === guess) {
    const timeTaken = Date.now() - startTime;
    saveScore(name, guessCount, timeTaken);
    alert('Congratulations ' + name + '! You guessed it correctly in ' + guessCount + ' guesses and ' + timeTaken + ' ms');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('bestScore').textContent = 'Best score: ' + localStorage.getItem('bestScore');
  }
});

function generateUniqueNumber() {
  let digits = '0123456789';
  let number = '';
  for(let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * digits.length);
    number += digits[randomIndex];
    digits = digits.replace(digits[randomIndex], '');
  }
  return number;
}

function getClue(number, guess) {
  let clue = '';
  for(let i = 0; i < number.length; i++) {
    if(number[i] === guess[i]) {
      clue += '+';
    } else if(number.includes(guess[i])) {
      clue += '-';
    }
  }
  return clue;
}

function saveScore(name, guesses, timeTaken) {
  const score = calculateScore(guesses, timeTaken);
  if(localStorage.getItem('bestScore') === null || score < localStorage.getItem('bestScore')) {
    localStorage.setItem('bestScore', score);
    localStorage.setItem('bestScorer', name);
  }
}

function calculateScore(guesses, timeTaken) {
  return guesses * 1000 + timeTaken; // The lower the score the better
}
