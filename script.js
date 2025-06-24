const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

const icons = ["🍎", "🍌", "🍓", "🍇", "🍒", "🥝", "🍍", "🍑"];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${icon}</div>
      <div class="card-back">?</div>
    </div>
  `;
  card.addEventListener("click", () => flipCard(card, icon));
  return card;
}

function flipCard(card, icon) {
  if (
    flippedCards.length === 2 ||
    card.classList.contains("flipped") ||
    matchedCards.includes(icon)
  ) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push({ card, icon });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.icon === second.icon) {
    matchedCards.push(first.icon);
    flippedCards = [];
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

function initGame() {
  board.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  const cardIcons = shuffle([...icons, ...icons]);
  cards = cardIcons.map((icon) => createCard(icon));
  cards.forEach((card) => board.appendChild(card));
}

restartBtn.addEventListener("click", initGame);

initGame(); // Start game on load
