let currentIndex = 0;
let score = 0;
let wordArray = [];
let lives = 3;

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

async function getWords() {
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=100');
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
  const elementsToHide = document.querySelectorAll('.end-game-disable');
  document.getElementById('game-over').textContent = ''
  document.getElementById('score').textContent = `${score}`
  for (element of elementsToHide){
    element.style.display = 'block';
  }
  document.getElementById('start').style.display = 'none';
  timeOutId = setTimeout(endGame, 60000, 1000);
  getWords();
}

function checkWord() {
  let inputBox = document.getElementById("input-box");
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

function completeWord() {
    currentWord = wordArray[currentIndex];
    document.getElementById('current-word').textContent = currentWord;
    document.getElementById('current-word').style.color = getRandomColor();
    currentIndex++;
  }


function endGame() {
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

