let currentIndex = 0;
let score = 0;
let wordArray = [];
let currentArray = [];
let lives = 3;
let inputBox = document.getElementById("input-box");

function getRandomColor() {
  //Assign random color to word displayed on screen
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

async function getWords() {
  // Asynchronous function to retrieve and store words within array
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=1000');
  const data = await response.json();
  wordArray = data;
  completeWord();
}

function startGame() {
  //reset lives back to 3 when game starts
  lives = 3;
  score = 0;
  currentIndex = 0;
  document.getElementById('lives').textContent = `${lives}`
  //hide end game elements
  const elementsToHide = document.querySelectorAll('.end-game-disable');
  document.getElementById('game-over').textContent = ''
  for (element of elementsToHide){
    element.style.display = 'block';
  }
  document.getElementById('start').style.display = 'none';
  document.getElementById('score').textContent = `${score}`
  timeOutId = setTimeout(endGame, 60000, 1000);
  getWords();
}

function checkWord() {
  /* check to see if the user's text matches word provided by game
  and check if lives are still left or if the user has run out of lives */
  let inputText = inputBox.value;
  inputBox.value = '';
  if (currentWord == inputText) {
    score++;
    document.getElementById('score').textContent = `${score}`;
  }
  else {
    lives--;
    document.getElementById('lives').textContent = `${lives}`;
  }
  if (lives <= 0) {
    endGame();
  }
  
  else {
  completeWord();
  }
}

inputBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkWord();
  }
});

function completeWord() {
    // Assign word to display on screen depending on difficulty level
    
    currentScore = document.getElementById('score').textContent
    wordElement = document.getElementById('current-word').textContent
    currentWord = wordArray[currentIndex];
    if (currentScore < 5){
      currentWords = wordArray.filter(word => word.length < 5)
      currentWord = currentWords[currentIndex]
      wordElement = currentWord
    }
    else if (currentScore >= 5 && currentScore < 10){
      currentWords = wordArray.filter(word => word.length >= 5 && word.length < 7)
      currentWord = currentWords[currentIndex]
      wordElement = currentWord
    }
    else if (currentScore >= 10 && currentScore < 15){
      currentWords = wordArray.filter(word => word.length >= 7 && word.length < 10)
      currentWord = currentWords[currentIndex]
      wordElement = currentWord
    }
    else {
      currentWords = wordArray.filter(word => word.length >= 10 && word.length < 15)
      currentWord = currentWords[currentIndex]
      wordElement = currentWord
    }
    document.getElementById('current-word').textContent = currentWord;
    document.getElementById('current-word').style.color = getRandomColor();
    currentIndex++;
}


function endGame() {
  // Clear certain elements on screen and create an end game screen
  clearTimeout(timeOutId);
  const elementsToHide = document.querySelectorAll('.end-game-disable');
  for (element of elementsToHide){
    element.style.display = 'none';
  }
  document.getElementById('game-over').textContent = `Congrats! You scored ${score}`;
  const button = document.createElement('button');
  button.textContent = 'Play Again';
  button.addEventListener('click', startGame);
  document.getElementById('game-over').appendChild(button);
  }
  
