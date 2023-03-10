window.onload = function() {
    const name = prompt("Please enter your name:");
    const contestantEl = document.querySelector(".contestant");
    contestantEl.innerHTML = `${name}`;
};

const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");
    
let correctWord, timer;
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(60);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();


const pointsText = document.querySelector(".points");

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) {
        alert(`Oops! ${userWord} is not a correct word`);
        lifeText.innerText = lifeText.innerText.slice(0, -1); // restar un corazón
        if (lifeText.innerText === "") {
            alert("Game over! You ran out of lives.");
            initGame();
        }
    } else {
        alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
        pointsText.innerText = parseInt(pointsText.innerText) + 1; // agregar un punto
        initGame();
    }
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

const handleKeyPress = event => {
    if (event.keyCode === 13) {
        checkWord();
    }
}
inputField.addEventListener("keypress", handleKeyPress);

const lifeText = document.querySelector(".life");

