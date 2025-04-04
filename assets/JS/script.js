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
        buttons[i].classList.remove('hover:bg-green-500', 'hover:text-white');
    }
});

// in game variables
const ball = document.getElementById("ball");
let countdown;
let choice = [];
const possibleChoice = ['Long Pass', 'Short Pass', 'Dribble'];
let goals = document.getElementById("goals").innerText;
let distance = document.getElementById("distance").innerText;
let time = document.getElementById("time").innerText;

// game end variables
const gameEndModal = document.getElementById("game-end-modal");
const closeGameEndModal = document.getElementById("close-game-end-modal");

// button variables
const buttons = document.getElementsByClassName('game-button');
const startButton = document.getElementById("start-game");

// buttons event listener
startButton.addEventListener("click", startGame);

// sounds
const crowdAudio = new Audio("assets/sounds/general-crowd-background.mp3");
const startWhistle = new Audio("assets/sounds/start-whistle.mp3");
const endWhistle = new Audio("assets/sounds/full-time-whistle.mp3");
const goalAudio = new Audio("assets/sounds/goal.mp3");
const missedShot = new Audio("assets/sounds/missed-shot.m4a");

// event listener to stop sound if screen minimised
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        crowdAudio.pause();
    } else {
        crowdAudio.play();
    }
});

// event listener for buttons pressed.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        compChoice(buttons[i].innerText);
    });
}

// function to run on start button pressed
function startGame() {
    clearInterval(countdown);
    choice = [];
    ball.style.left = "10%";
    startWhistle.play();
    crowdAudio.volume = 0.5;
    crowdAudio.play();

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add('hover:bg-green-500', 'hover:text-white');
    }

    document.getElementById("goals").innerText = 0;
    document.getElementById("distance").innerText = 60;
    document.getElementById("time").innerText = 90;

    // create time countdown
    let timeRemaining = parseInt(document.getElementById("time").innerText);

    countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById("time").innerText = timeRemaining;
        } else {
            if (!isDocumentHidden()) {
                endWhistle.play();
            }
            // Wait for the endWhistle to finish before stopping the crowdAudio
            endWhistle.addEventListener('ended', function () {
                crowdAudio.pause();
                crowdAudio.currentTime = 0;
                clearInterval(countdown);
                document.getElementById("goals-total").innerText = document.getElementById("goals").innerText;
                // ensure correct pluralisation
                const pluralCheck = parseInt(document.getElementById("goals").innerText);
                if (pluralCheck < 2) {
                    document.getElementById("plural").innerText = "goal";
                } else {
                    document.getElementById("plural").innerText = "goals";
                }
                gameEndModal.classList.remove("hidden");

                closeGameEndModal.addEventListener("click", function () {
                    document.getElementById("goals").innerText = 0;
                    document.getElementById("time").innerText = 90;
                    document.getElementById("distance").innerText = 60;

                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].disabled = true;
                        buttons[i].classList.remove('hover:bg-green-500', 'hover:text-white');
                    }

                    gameEndModal.classList.add("hidden");
                });
            });
        }
    }, 1000);

}

// function to generate a defence choice by the computer opponent
function compChoice(playerChoice) {
    // check the button pressed is legal given the distance from goal.
    if (playerChoice !== "Shoot" && document.getElementById("distance").innerText === "1") {
        alert("You are so close to the goal! You need to shoot!");
        return;
    }
    if (playerChoice === "Long Pass" && document.getElementById("distance").innerText === "10") {
        alert("You are too close to the goal for a long pass. Try something different.");
        return;
    }
    // disable buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].classList.remove('hover:bg-green-500', 'hover:text-white');
    }

    //check if shoot has been pressed
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
            resolvePlay(playerChoice, compDefence);
            return;
        }
    }

    // then generate random defence
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
    resolvePlay(playerChoice, compDefence);
}

// function to run if shot button is pressed at any time
async function shoot() {
    const shotPosition = parseInt(document.getElementById("distance").innerText);
    let goals = parseInt(document.getElementById("goals").innerText);
    const shotRandomNumber = Math.floor(Math.random() * 100) + 1;

    // calculate shot success based on distance from goal
    if (shotPosition === 60) {
        if (shotRandomNumber < 2) {
            goalAudio.play();
            ball.style.left = "90%";
            goals = goals + 1;
            document.getElementById("goals").innerText = goals;
            await sleep(1500);
            returnBall();
            return
        } else {
            missedShot.play();
            returnBall();
            return
        }
    } else if (shotPosition === 40) {
        if (shotRandomNumber < 6) {
            goalAudio.play();
            ball.style.left = "90%";
            goals = goals + 1;
            document.getElementById("goals").innerText = goals;
            await sleep(1500);
            returnBall();
            return
        } else {
            missedShot.play();
            returnBall();
            return
        }
    } else if (shotPosition === 20) {
        if (shotRandomNumber < 15) {
            goalAudio.play();
            ball.style.left = "90%";
            goals = goals + 1;
            document.getElementById("goals").innerText = goals;
            await sleep(1500);
            returnBall();
            return
        } else {
            missedShot.play();
            returnBall();
            return
        }
    } else if (shotPosition === 10) {
        if (shotRandomNumber < 50) {
            goalAudio.play();
            ball.style.left = "90%";
            goals = goals + 1;
            document.getElementById("goals").innerText = goals;
            await sleep(1500);
            returnBall();
            return
        } else {
            missedShot.play();
            returnBall();
            return
        }
    } else if (shotPosition === 1) {
        if (shotRandomNumber < 85) {
            goalAudio.play();
            ball.style.left = "90%";
            goals = goals + 1;
            document.getElementById("goals").innerText = goals;
            await sleep(1500);
            returnBall();
            return
        } else {
            missedShot.play();
            returnBall();
            return
        }
    }
}

// function to resolve the player move
function resolvePlay(playerChoice, compDefence) {
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

async function forwardOne() {
    const movementStart = parseInt(document.getElementById("distance").innerText);
    if (movementStart === 60) {
        ball.style.left = "32%";
        document.getElementById("distance").innerText = 40;
    } else if (movementStart === 40) {
        ball.style.left = "55%";
        document.getElementById("distance").innerText = 20;
    } else if (movementStart === 20) {
        ball.style.left = "73%";
        document.getElementById("distance").innerText = 10;
    } else {
        ball.style.left = "86%";
        document.getElementById("distance").innerText = 1;
    }
    await sleep(1100);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add('hover:bg-green-500', 'hover:text-white');
    }
}


async function forwardTwo() {
    const movementStartLongPass = parseInt(document.getElementById("distance").innerText);
    if (movementStartLongPass === 60) {
        ball.style.left = "55%";
        document.getElementById("distance").innerText = 20;
    } else if (movementStartLongPass === 40) {
        ball.style.left = "73%";
        document.getElementById("distance").innerText = 10;
    } else {
        ball.style.left = "86%";
        document.getElementById("distance").innerText = 1;
    }
    await sleep(1100);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add('hover:bg-green-500', 'hover:text-white');
    }
}

async function returnBall() {
    ball.classList.remove("visible");
    ball.classList.add("invisible");

    await sleep(800);

    ball.style.transition = "none"
    ball.style.left = '10%';

    await sleep(1500);

    document.getElementById("distance").innerText = 60;
    ball.classList.remove("invisible");
    ball.classList.add("visible");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add('hover:bg-green-500', 'hover:text-white');
    }
}


// time delay function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// check document is on screen function
function isDocumentHidden() {
    return document.hidden || document.visibilityState === 'hidden';
}