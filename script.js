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
  document.getElementById('start').style.display = 'none';
  setTimeout(endGame, 60000, 1000);
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
    const elements = document.querySelectorAll("[id]");
    for (let element of elements){
        if (element.getAttribute('id') === 'game-over'){
          element.textContent = "Hi, test";
          element.style.color = 'red';
          element.style.fontSize = "50px";
          console.log(element);
        }
        else{
          element.innerHTML = '';
        }
        
    }
        document.body.style.backgroundColor = '#000000';
    }

