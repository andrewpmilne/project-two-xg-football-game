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
        buttons[i].classList.add('disabled:bg-gray-400')
    }
});

// in game variables
const ball = document.getElementById("ball");
let countdown;
let choice = [];
const possibleChoice = ['Long Pass', 'Short Pass', 'Dribble'];
const goals = document.getElementById("goals");
const distance = document.getElementById("distance");
const time = document.getElementById("time");
const commentary = document.getElementById("commentary");

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
    } else if (parseInt(document.getElementById("time").innerText) < 90) {
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
    document.getElementById("commentary").innerText = `"The game has started!"`;

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
                    document.getElementById("commentary").innerText = `"And the game is about to begin..."`;

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
    const shotRandomNumber = Math.floor(Math.random() * 100) + 1;

    // calculate shot success based on distance from goal
    if (shotPosition === 60) {
        if (shotRandomNumber < 2) {
            goal();
            return;
        } else {
            missedShot.play();
            document.getElementById("commentary").innerText = `"You'll never score from that far out!"`;
            returnBall();
            return;
        }
    } else if (shotPosition === 40) {
        if (shotRandomNumber < 6) {
            goal();
            return;
        } else {
            missedShot.play();
            document.getElementById("commentary").innerText = `"Very little chance of that going in."`;
            returnBall();
            return;
        }
    } else if (shotPosition === 20) {
        if (shotRandomNumber < 15) {
            goal();
            return;
        } else {
            missedShot.play();
            document.getElementById("commentary").innerText = `"Ooooh! Close but still too far out."`;
            returnBall();
            return;
        }
    } else if (shotPosition === 10) {
        if (shotRandomNumber < 50) {
            goal();
            return;
        } else {
            missedShot.play();
            document.getElementById("commentary").innerText = `"Oh! Bad luck but it's missed."`;
            returnBall();
            return;
        }
    } else if (shotPosition === 1) {
        if (shotRandomNumber < 85) {
            goal();
            return;
        } else {
            missedShot.play();
            document.getElementById("commentary").innerText = `"Oh no! You've missed a brilliant chance!"`;
            returnBall();
            return;
        }
    }
}

// function to resolve the player move
function resolvePlay(playerChoice, compDefence) {
    if (playerChoice === compDefence) {
        document.getElementById("commentary").innerText = `"Bad luck! Intercepted."`;
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
        document.getElementById("commentary").innerText = `"That's a lovely move forward..."`;
    } else if (movementStart === 40) {
        ball.style.left = "55%";
        document.getElementById("distance").innerText = 20;
        document.getElementById("commentary").innerText = `"Oooh, great play by the attackers!"`;
    } else if (movementStart === 20) {
        ball.style.left = "73%";
        document.getElementById("distance").innerText = 10;
        document.getElementById("commentary").innerText = `"They're getting in a good position now..."`;
    } else {
        ball.style.left = "86%";
        document.getElementById("distance").innerText = 1;
        document.getElementById("commentary").innerText = `"Now it's time for a shot!!"`;
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
        document.getElementById("commentary").innerText = `"What a fantastic pass!"`;
    } else if (movementStartLongPass === 40) {
        ball.style.left = "73%";
        document.getElementById("distance").innerText = 10;
        document.getElementById("commentary").innerText = `"It's a long ball into the box!"`;
    } else {
        ball.style.left = "86%";
        document.getElementById("distance").innerText = 1;
        document.getElementById("commentary").innerText = `"So near! Surely they must score?!"`;
    }
    await sleep(1100);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add('hover:bg-green-500', 'hover:text-white');
    }
}

async function goal() {
    let goals = parseInt(document.getElementById("goals").innerText);
    goalAudio.play();
    document.getElementById("commentary").innerText = `"It's a GOOOAAAAL!!"`;
    ball.style.left = "90%";
    goals = goals + 1;
    document.getElementById("goals").innerText = goals;
    await sleep(1500);
    returnBall();
}

async function returnBall() {
    ball.classList.remove("visible");
    ball.classList.add("invisible");

    await sleep(800);

    ball.style.transition = "none";
    ball.style.left = '10%';

    await sleep(1500);

    document.getElementById("distance").innerText = 60;
    ball.classList.remove("invisible");
    ball.classList.add("visible");
    document.getElementById("commentary").innerText = `"Time for another attack..."`;
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