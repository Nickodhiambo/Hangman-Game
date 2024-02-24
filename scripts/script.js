const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const hangmanImage = document.querySelector(".hangman-box img");

const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessesCount;
const maxGuesses = 6;

// Checks whether game ends in a victory or loss
const gameStatus = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? "You found the word: " : "The correct word was: ";
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? "Congrats!" : "Hard Luck!";
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
};

// Resets game and UI components at game over
const resetGame = () => {
    wrongGuessesCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`;
    correctLetters = [];
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")

}

// Get random word from Word List databank
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint
    resetGame();
}

const initGame = (button, clickedLetter) => {
    // Display a letter if correct
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessesCount++;
        hangmanImage.src = `images/hangman-${wrongGuessesCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`;

    if (wrongGuessesCount === maxGuesses) return gameStatus(false);
    if (correctLetters.length === currentWord.length) return gameStatus(true);
}

for (let i = 97; i <= 122; i++){
    //Create buttons
     button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    // Display clicked button
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);