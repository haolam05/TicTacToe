export default function initializeEvents() {
  function isGameOver() {
    const winner = hasWinner();
    if (winner) return winner;
    if (document.querySelectorAll('.square>img').length == 9) return 'None';
    return null;
  }

  function isAllEqual(i, j, k) {
    const first = document.getElementById(`square-${i}`).children[0]?.classList[0];
    const second = document.getElementById(`square-${j}`).children[0]?.classList[0];
    const third = document.getElementById(`square-${k}`).children[0]?.classList[0];
    if (first && first == second && second == third) return first;
    return null;
  }

  function hasWinner() {
    function _horizontalWin() {
      for (let i = 0; i < 9; i += 3) {
        const result = isAllEqual(i, i + 1, i + 2);
        if (result) return result
      }
      return null
    }

    function _VerticalWin() {
      for (let i = 0; i < 3; i++) {
        const result = isAllEqual(i, i + 3, i + 6);
        if (result) return result
      }
      return null
    }

    function _diagonalWin() {
      return isAllEqual(4, 0, 8) || isAllEqual(4, 2, 6);
    }

    return _horizontalWin() || _VerticalWin() || _diagonalWin();
  }

  function resetBoard() {
    for (let i = 0; i < 9; i++) {
      document.getElementById(`square-${i}`).innerHTML = '';
    }
  }

  function displayWinner(winner, display = true) {
    winnerEl.innerText = winner;
    display ? winnerEl.parentElement.classList.remove('hidden') : winnerEl.parentElement.classList.add('hidden');
  }

  function resetGameCallback() {
    turnIdx = 0;
    setListener(boardEl, 1, clickCallback);
    setDisable(newGameBtnEl, 1);
    setDisable(giveUpBtnEl, 0);
    displayWinner('', false);
    resetBoard();
    saveToStorage('game', getBody());
    saveToStorage('turnIdx', turnIdx);
    saveToStorage('board-disabled', 0);
    saveToStorage('new-game-btn-disabled', 1);
    saveToStorage('give-up-btn-disabled', 0);
  }

  function giveUpCallback() {
    displayWinner(turnIdx ? 'X' : 'O');
    setListener(boardEl, 0, clickCallback);
    setDisable(newGameBtnEl, 0);
    setDisable(giveUpBtnEl, 1);
    saveToStorage('game', getBody());
    saveToStorage('board-disabled', 1);
    saveToStorage('new-game-btn-disabled', 0);
    saveToStorage('give-up-btn-disabled', 1);
  }

  function clickCallback(e) {
    if (e.target.classList.contains('square') && e.target.innerHTML == '' && winnerEl.innerText.length == 0) {
      e.target.innerHTML = turns[turnIdx];
      turnIdx = (turnIdx + 1) % turns.length;
      const winner = isGameOver();
      if (winner) {
        displayWinner(winner);
        setListener(boardEl, 0, clickCallback);
        setListener(boardEl, 0, clickCallback);
        setDisable(newGameBtnEl, 0);
        setDisable(giveUpBtnEl, 1);
        saveToStorage('board-disabled', 1);
        saveToStorage('new-game-btn-disabled', 0);
        saveToStorage('give-up-btn-disabled', 1);
      }
      saveToStorage('game', getBody());
      saveToStorage('turnIdx', turnIdx);
    }
  }

  function getBody() {
    return document.querySelector('body').innerHTML;
  }

  function saveToStorage(k, v) {
    localStorage.setItem(k, v);
  }

  function setListener(el, status, cb, event = 'click') {
    if (status == null) return
    Number(status) ? el.addEventListener(event, cb) : el.removeEventListener(event, cb);
  }

  function setDisable(el, status) {
    if (status == null) return
    Number(status) ? el.setAttribute('disabled', '') : el.removeAttribute('disabled');
  }

  function addEventsListener() {
    setListener(boardEl, 1, clickCallback);
    setListener(newGameBtnEl, 1, resetGameCallback);
    setListener(giveUpBtnEl, 1, giveUpCallback);
  }

  function restoreFromLocalStorage() {
    setListener(boardEl, turnIdx == null ? 1 : storageBoardStatus, clickCallback);
    setDisable(newGameBtnEl, storageNewGameBtnStatus);
    setDisable(giveUpBtnEl, storageGiveUpBtnStatus);
    turnIdx = Number(storageTurnIdx);
  }

  let turnIdx;
  const boardEl = document.querySelector('#board');
  const newGameBtnEl = document.querySelector('#new-game-btn');
  const giveUpBtnEl = document.querySelector('#give-up-btn');
  const storageTurnIdx = localStorage.getItem('turnIdx');
  const storageBoardStatus = localStorage.getItem('board-disabled');
  const storageNewGameBtnStatus = localStorage.getItem('new-game-btn-disabled');
  const storageGiveUpBtnStatus = localStorage.getItem('give-up-btn-disabled');
  const winnerEl = document.querySelector('#winner');
  const turns = [
    `<img alt='X' src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg' class='X'>`,
    `<img alt='O' src='https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg' class='O'>`
  ];

  addEventsListener();
  restoreFromLocalStorage();
}
