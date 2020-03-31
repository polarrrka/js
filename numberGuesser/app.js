let min = 1, 
    max = 10;
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function(e){
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a num between ${min} and ${max}`, 'red')
  } else {
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct! You WIN!`)
    } else {
      guessesLeft -= 1;
    if(guessesLeft === 0) {
      gameOver(false, `Game over! The correct num was ${winningNum}`)
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value ='';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
  }
});

function gameOver (won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function getRandomNum (min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});
