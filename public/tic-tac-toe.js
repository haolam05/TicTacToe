import initializeEvents from './events.js';

function initializeGame() {
  if (localStorage.getItem('game')) {
    document.body.innerHTML = localStorage.getItem('game');
  } else {
    createGameOverMsg();
    createBoard();
    createButtons();
  }
  initializeEvents();
}

function createBoard() {
  const div = document.createElement('div');
  div.setAttribute('id', 'board');
  for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.setAttribute('id', `square-${i}`);
    square.classList.add('square');
    div.appendChild(square);
  }
  document.body.appendChild(div);
}

function createButtons() {
  const div = document.createElement('div');
  const newGameBtn = document.createElement('button');
  const giveUpBtn = document.createElement('button');
  div.setAttribute('id', 'buttons');
  newGameBtn.setAttribute('id', 'new-game-btn');
  giveUpBtn.setAttribute('id', 'give-up-btn');
  newGameBtn.innerText = 'New Game';
  giveUpBtn.innerText = 'Give Up';
  newGameBtn.setAttribute('disabled', '');
  div.appendChild(newGameBtn);
  div.appendChild(giveUpBtn);
  document.body.appendChild(div);
}

function createGameOverMsg() {
  const h1 = document.createElement('h1');
  h1.innerHTML = `Winner: <span id="winner"></span>`;
  h1.classList.add('hidden');
  document.body.appendChild(h1);
}

window.onload = initializeGame;
