'use strict';

// ХРЕСТИКИ - НУЛИКИ

const winningСombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// ----------------------------

const container = document.querySelector('.js-container');
const btn = document.querySelector('.js-button');
const counter = document.querySelector('.js-counter');
const winner = document.querySelector('.js-winner');

// ----------------------------

function createMurkup() {
  let markup = '';

  for (let i = 1; i < 10; i++) {
    markup += `<div class="js-item item" data-id ="${i}"></div>`;
  }

  return markup;
}

container.insertAdjacentHTML('beforeend', createMurkup());

// ----------------------------

let player = '✘';
let playerX = [];
let playerO = [];

// ----------------------------

container.addEventListener('click', onClick);

function onClick(e) {
  const { target } = e;

  if (!target.classList.contains('js-item') || target.textContent !== '') {
    return;
  }

  pushIdInPlayersArray(Number(target.dataset.id));

  target.textContent = player;
  player = player === '✘' ? '⭕' : '✘';

  const winnerX = whoIsWinner(playerX);
  const winnerO = whoIsWinner(playerO);

  if (winnerX) {
    winner.textContent = 'Переміг гравець ✘ 😁😁😁';

    container.removeEventListener('click', onClick);
    
    btn.classList.remove('is-hidden');

    let counterValue = Number(
      counter.firstElementChild.firstElementChild.value
    );
    counterValue += 1;
    counter.firstElementChild.firstElementChild.value = counterValue;
  } else if (winnerO) {
    winner.textContent = 'Переміг гравець ⭕ 😁😁😁';

    container.removeEventListener('click', onClick);
    
    btn.classList.remove('is-hidden');

    let counterValue = Number(counter.lastElementChild.firstElementChild.value);
    counterValue += 1;
    counter.lastElementChild.firstElementChild.value = counterValue;
    
  } else if (playerO.length + playerX.length === 9) {
    winner.textContent = 'Перемогла ДРУЖБА!!!😊';
    btn.classList.remove('is-hidden');
  }

  btn.addEventListener('click', onBtnClick);
}

function pushIdInPlayersArray(targetId) {
  const id = targetId;
  if (player === '✘') {
    playerX.push(id);
  } else {
    playerO.push(id);
  }
}

function whoIsWinner(playerArr) {
  return winningСombinations.some(combination =>
    combination.every(number => playerArr.includes(number))
  );
}

function onBtnClick(e) {
  container.innerHTML = '';
  container.innerHTML = createMurkup();
  playerO = [];
  playerX = [];
  player = '✘';
  container.addEventListener('click', onClick);
  btn.classList.add('is-hidden');
  winner.textContent = '';
}
