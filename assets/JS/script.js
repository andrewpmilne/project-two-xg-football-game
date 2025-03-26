const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

// Variables
let goals = document.getElementById("goals").innerText
let time = document.getElementById("time").innerText
let distance = document.getElementById("distance").innerText
let countdown;
let choice = [];
let buttons = document.getElementsByClassName('game-button');

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

function compChoice() {

}

function shoot() {

}

function forwardOne() {

}

function forwardTwo() {

}

function returnBall() {}