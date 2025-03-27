// when page loaded event listener
document.addEventListener("DOMContentLoaded", function () {
    const welcomeModal = document.getElementById("welcome-modal");
    const closeWelcomeModal = document.getElementById("close-welcome-modal");
    if (!sessionStorage.getItem("modalShown")) {
        welcomeModal.classList.remove("hidden");
        sessionStorage.setItem("modalShown", "true");
    }

    closeWelcomeModal.addEventListener("click", function () {
        welcomeModal.classList.add("hidden");
    });

    const buttons = document.getElementsByClassName('game-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
});

// in game variables
let goals = document.getElementById("goals").innerText
let time = document.getElementById("time").innerText
let distance = document.getElementById("distance").innerText
let countdown;
let choice = [];

// game end variables
const gameEndModal = document.getElementById("game-end-modal");
const closeGameEndModal = document.getElementById("close-game-end-modal");

// button variables
const buttons = document.getElementsByClassName('game-button');
const startButton = document.getElementById("start-game");

// buttons event listener
startButton.addEventListener("click", startGame);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        compChoice(buttons[i].innerText);
    });
}

// function to run on start button pressed
function startGame() {
    clearInterval(countdown);
    choice = [];
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    let goals = 0
    let time = 90
    let distance = 60
    document.getElementById("time").innerText = time;


    let timeRemaining = parseInt(document.getElementById("time").innerText);

    countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById("time").innerText = timeRemaining;
        } else {
            clearInterval(countdown);
            document.getElementById("goals-total").innerText = goals;
            gameEndModal.classList.remove("hidden");
            closeGameEndModal.addEventListener("click", function () {
                gameEndModal.classList.add("hidden");
                document.getElementById("goals").innerText = 0;
                document.getElementById("time").innerText = 90;
                document.getElementById("distane").innerText = 60;
            });
        }
    }, 1000);
}

function compChoice(playerChoice) {
    console.log(playerChoice);
}

function shoot() {

}

function forwardOne() {

}

function forwardTwo() {

}

function returnBall() {

}