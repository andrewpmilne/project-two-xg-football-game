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

    choice.push(playerChoice);
    if (choice.length === 7) {
        choice.pop();
    }
}
// add more variable
// how the computer decides its defence
for (let item of possibleChoice) {
    let count = 0;

    for (let i = 0; i < choice.length; i++) {
        if (choice[i] === item) {
            count++;
        }
    }

    /*
    // continue from here    else {
        const defenceChoice = '';
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        if 
        if (randomNumber <=25) {
            let defenceChoice = 'Short Pass';
        } else if (randomNumber > 25 && <= 50) { 
            let defenceChoice = 'Dribble';
        }
    }
*/
}


function shoot() {

}

function forwardOne() {

}

function forwardTwo() {

}

function returnBall() {

}