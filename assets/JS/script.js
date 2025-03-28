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
const possibleChoice = ['Long Pass', 'Short Pass', 'Dribble'];

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
                document.getElementById("goals").innerText = 0;
                document.getElementById("time").innerText = 90;
                document.getElementById("distance").innerText = 60;

                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = true;
                }

                gameEndModal.classList.add("hidden");
            });
        }
    }, 1000);
}

function compChoice(playerChoice) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    if (playerChoice === 'Shoot') {
        shoot();
        return;
    }


    let compDefence = '';
    choice.unshift(playerChoice);
    if (choice.length === 8) {
        choice.pop();
    }

    // how the computer decides its defence - first check for patterns
    for (let item of possibleChoice) {
        let count = 0;

        for (let i = 0; i < choice.length; i++) {
            if (choice[i] === item) {
                count++;
            }
        }
        if (count >= 4) {
            compDefence = item;
            resolve(playerChoice, compDefence);
            return;
        }
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber <= 20) {
        compDefence = 'Short Pass';
    } else if (randomNumber > 20 && randomNumber <= 40) {
        compDefence = 'Dribble';
    } else if (randomNumber > 40 && randomNumber <= 80) {
        compDefence = 'Long Pass';
    } else {
        compDefence = 'No Defence';
    }
    resolve(playerChoice, compDefence);
}


function shoot() {

}

function resolve(playerChoice, compDefence) {
    if (playerChoice === compDefence) {
        returnBall();
    } else {
        if (playerChoice === 'Long Pass') {
            forwardTwo();
        } else {
            forwardOne();
        }
    }

}

function forwardOne() {

}

function forwardTwo() {

}

function returnBall() {

}