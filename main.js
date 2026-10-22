const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍋", "🍉", "🥝"];

const game = document.getElementById("game");
const movesText = document.getElementById("moves");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let locked = false;

function startGame() {
    game.innerHTML = "";
    firstCard = null;
    secondCard = null;
    moves = 0;
    matchedPairs = 0;
    locked = false;

    movesText.textContent = moves;
    message.textContent = "";

    const cards = [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5);

    cards.forEach((emoji) => {
        const card = document.createElement("button");

        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.setAttribute("aria-label", "Hidden card");

        card.addEventListener("click", () => flipCard(card));

        game.appendChild(card);
    });
}

function flipCard(card) {
    if (
        locked ||
        card.classList.contains("open") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.textContent = card.dataset.emoji;
    card.classList.add("open");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesText.textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        firstCard = null;
        secondCard = null;
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            message.textContent =
                `You won in ${moves} moves! 🎉`;
        }
    } else {
        locked = true;

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("open");
            secondCard.classList.remove("open");

            firstCard = null;
            secondCard = null;
            locked = false;
        }, 800);
    }
}

restartButton.addEventListener("click", startGame);

startGame();