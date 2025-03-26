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

let goals = document.getElementById("goals").innerText
let time = document.getElementById("time").innerText
let distance = document.getElementById("distance").innerText
let countdown;
let choice = [];
const buttons = document.getElementsByClassName('game-button');

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        compChoice(buttons[i].innerText);
    });
}

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
            console.log("time is up")
            clearInterval(countdown);
        }
    }, 1000);
}

function compChoice(playerChoice) {
    console.log("hello2");
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