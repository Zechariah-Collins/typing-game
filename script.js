let currentIndex = 0;
let score = 0;
let wordArray = [];
let lives = 3;

async function getWords() {
  const response = await fetch('https://random-word-api.herokuapp.com/word?number=100');
  const data = await response.json();
  wordArray = data;
  completeWord();
}

function startGame() {
  document.getElementById('start').style.display = 'none';
  setTimeout(endGame, 60000);
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
  completeWord();
}

function completeWord() {
    currentWord = wordArray[currentIndex];
    document.getElementById('current-word').textContent = currentWord;
    currentIndex++;
  }


function endGame() {
    const elements = document.querySelectorAll("*");
    for (let element of elements) {
            element.innerHTML = '';
        }
        document.body.style.backgroundColor = '#000000';
    }
  