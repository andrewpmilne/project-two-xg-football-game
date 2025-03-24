const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

// Global Variables
let countdown;
let choice = [];

function startGame() {
    clearInterval(countdown);
    choice = [];
    document.getElementById("goals").innerText = 0
    document.getElementById("time").innerText = 90
    document.getElementById("distance").innerText = 60

    let buttons = document.getElementsByClassName('game-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

    // Loop through the HTMLCollection to access each element
    for (let i = 0; i < items.length; i++) {
        console.log(items[i].innerText); // Logs the text inside each element with class 'item'
    }

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