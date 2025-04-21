/* jshint esversion: 8 */

// when page loaded event listener
document.addEventListener("DOMContentLoaded", function () {
    const welcomeModal = document.getElementById("welcome-modal");
    const closeWelcomeModal = document.getElementById("close-welcome-modal");
    if (welcomeModal && closeWelcomeModal) {
        if (!sessionStorage.getItem("modalShown")) {
            welcomeModal.classList.remove("hidden");
            sessionStorage.setItem("modalShown", "true");
        }
        closeWelcomeModal.addEventListener("click", function () {
            welcomeModal.classList.add("hidden");
        });
    }
    const buttons = document.getElementsByClassName("game-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].classList.remove("hover:bg-green-500", "hover:text-white");
        buttons[i].classList.add("disabled:bg-gray-400")
    }

    // start button event listener
    startButton.addEventListener("click", function () {
        const timeValue = parseInt(time.innerText);
        if (timeValue < 90) {
            const confirmRestart = confirm("Are you sure you want to restart the game and lose your current goals total?");
            if (confirmRestart) {
                startGame();
            }
        } else {
            startGame();
        }
    });

    // event listener for buttons pressed.
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            compChoice(buttons[i].innerText);
        });
    }
});

// in game variables
const ball = document.getElementById("ball");
let countdown;
let choice = [];
const possibleChoice = ["Long Pass", "Short Pass", "Dribble"];
const goals = document.getElementById("goals");
const distance = document.getElementById("distance");
const time = document.getElementById("time");
const commentary = document.getElementById("commentary");

// game end variables
const gameEndModal = document.getElementById("game-end-modal");
const closeGameEndModal = document.getElementById("close-game-end-modal");

// button variables
const buttons = document.getElementsByClassName("game-button");
const startButton = document.getElementById("start-game");

// sounds
const crowdAudio = new Audio("assets/sounds/general-crowd-background.mp3");
const startWhistle = new Audio("assets/sounds/start-whistle.mp3");
const endWhistle = new Audio("assets/sounds/full-time-whistle.mp3");
const goalAudio = new Audio("assets/sounds/goal.mp3");
const missedShot = new Audio("assets/sounds/missed-shot.m4a");

//toggle sound on and off
const soundButton = document.getElementById('sound');
let soundOn = false;
soundButton.textContent = '🔇';
soundButton.setAttribute('aria-label', 'Sound off');

soundButton.addEventListener('click', () => {
    soundOn = !soundOn;
    soundButton.textContent = soundOn ? '🔊' : '🔇';
    soundButton.setAttribute('aria-label', soundOn ? 'Sound on' : 'Sound off');
});

// event listener to stop sound if screen minimised
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        crowdAudio.pause();
    } else if (parseInt(document.getElementById("time").innerText) > 0 && soundOn) {
        crowdAudio.play();
    }
});

/**
 * Function to run on start button pressed
 */
async function startGame() {
    document.getElementById("start-game").innerText = "Game Beginning...";
    await sleep(1500);
    clearInterval(countdown);
    choice = [];
    ball.style.left = "10%";
    document.getElementById("start-game").innerText = "End Game and Restart";
    if (soundOn) {
        startWhistle.play();
        crowdAudio.volume = 0.5;
        crowdAudio.currentTime = 0;
        crowdAudio.play();
    }

    // enable buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add("hover:bg-green-500", "hover:text-white");
    }

    // Check for sound toggle on and off loop
    let wasSoundOn = soundOn;
    let soundCheck = setInterval(() => {
            if (soundOn && !wasSoundOn) {
                crowdAudio.currentTime = 0;
                crowdAudio.play();
                wasSoundOn = true;
            } else if (!soundOn && wasSoundOn) {
                crowdAudio.pause();
                wasSoundOn = false;
            }
        },
        500);

    goals.innerText = 0;
    distance.innerText = 60;
    time.innerText = 90;
    commentary.innerText = `"The game has started!"`;

    // create time countdown
    let timeRemaining = parseInt(time.innerText);
    countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            time.innerText = timeRemaining;
        } else {
            clearInterval(countdown);
            if (!isDocumentHidden() && soundOn) {
                endWhistle.play();
                // Wait for the endWhistle to finish before stopping the crowdAudio
                endWhistle.addEventListener("ended", function () {
                    showEndModal();
                });
            } else {
                showEndModal();
            }
        }
    }, 1000);

    /**
     * Function to bring up game end modal when countdown reaches 0
     */
    function showEndModal() {
        crowdAudio.pause();
        crowdAudio.currentTime = 0;
        document.getElementById("goals-total").innerText = goals.innerText;
        // ensure correct pluralisation
        const pluralCheck = parseInt(goals.innerText);
        if (pluralCheck === 1) {
            document.getElementById("plural").innerText = "goal";
        } else {
            document.getElementById("plural").innerText = "goals";
        }
        gameEndModal.classList.remove("hidden");

        closeGameEndModal.addEventListener("click", function () {
            goals.innerText = 0;
            time.innerText = 90;
            distance.innerText = 60;
            commentary.innerText = `"And the game is about to begin..."`;
            document.getElementById("start-game").innerText = "Start Game";

            // disable buttons
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
                buttons[i].classList.remove("hover:bg-green-500", "hover:text-white");
            }
            gameEndModal.classList.add("hidden");
        });
    }
}

/**
 * Function to generate a defence choice by the computer opponent
 */
function compChoice(playerChoice) {
    // check the button pressed is legal given the distance from goal.
    if (playerChoice !== "Shoot" && distance.innerText === "1") {
        alert("You are so close to the goal! You need to shoot!");
        return;
    }
    if (playerChoice === "Long Pass" && distance.innerText === "10") {
        alert("You are too close to the goal for a long pass. Try something different.");
        return;
    }
    // disable buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        buttons[i].classList.remove("hover:bg-green-500", "hover:text-white");
    }

    //check if shoot has been pressed
    if (playerChoice === "Shoot") {
        shoot();
        return;
    }

    // add the player's choice to the array
    let compDefence = "";
    choice.unshift(playerChoice);
    if (choice.length === 8) {
        choice.pop();
    }

    // how the computer decides its defence - first check the choice array
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

    // then generate random defence if choice array not used
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber <= 20) {
        compDefence = "Short Pass";
    } else if (randomNumber > 20 && randomNumber <= 40) {
        compDefence = "Dribble";
    } else if (randomNumber > 40 && randomNumber <= 80) {
        compDefence = "Long Pass";
    } else {
        compDefence = "No Defence";
    }
    resolvePlay(playerChoice, compDefence);
}

/**
 * Function to run if shot button pressed at any time
 */
async function shoot() {
    const shotPosition = parseInt(distance.innerText);
    const shotRandomNumber = Math.floor(Math.random() * 100) + 1;

    // calculate shot success based on distance from goal
    if (shotPosition === 60) {
        if (shotRandomNumber < 2) {
            goalScoredFunction();
            return;
        } else {
            missedShotFunction(shotPosition);
            return;
        }
    } else if (shotPosition === 40) {
        if (shotRandomNumber < 6) {
            goalScoredFunction();
            return;
        } else {
            missedShotFunction(shotPosition);
            return;
        }
    } else if (shotPosition === 20) {
        if (shotRandomNumber < 15) {
            goalScoredFunction();
            return;
        } else {
            missedShotFunction(shotPosition);
            return;
        }
    } else if (shotPosition === 10) {
        if (shotRandomNumber < 50) {
            goalScoredFunction();
            return;
        } else {
            missedShotFunction(shotPosition);
            return;
        }
    } else if (shotPosition === 1) {
        if (shotRandomNumber < 85) {
            goalScoredFunction();
            return;
        } else {
            missedShotFunction(shotPosition);
            return;
        }
    }
}

/**
 * Function to resolve the player move
 */
function resolvePlay(playerChoice, compDefence) {
    if (playerChoice === compDefence) {
        commentary.innerText = `"Bad luck! Intercepted."`;
        returnBall();
    } else {
        if (playerChoice === "Long Pass") {
            forwardTwo();
        } else {
            forwardOne();
        }
    }
}

/**
 * Function to move ball forward one
 */
async function forwardOne() {
    const movementStart = parseInt(distance.innerText);
    if (movementStart === 60) {
        ball.style.left = "32%";
        distance.innerText = 40;
        commentary.innerText = `"That's a lovely move forward..."`;
    } else if (movementStart === 40) {
        ball.style.left = "55%";
        distance.innerText = 20;
        commentary.innerText = `"Oooh, great play by the attackers!"`;
    } else if (movementStart === 20) {
        ball.style.left = "73%";
        distance.innerText = 10;
        commentary.innerText = `"They're getting in a good position now..."`;
    } else {
        ball.style.left = "86%";
        distance.innerText = 1;
        commentary.innerText = `"Now it's time for a shot!!"`;
    }
    await sleep(1100);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add("hover:bg-green-500", "hover:text-white");
    }
}

/**
 * Function to move ball forward two
 */
async function forwardTwo() {
    const movementStartLongPass = parseInt(distance.innerText);
    if (movementStartLongPass === 60) {
        ball.style.left = "55%";
        distance.innerText = 20;
        commentary.innerText = `"What a fantastic pass!"`;
    } else if (movementStartLongPass === 40) {
        ball.style.left = "73%";
        distance.innerText = 10;
        commentary.innerText = `"It's a long ball into the box!"`;
    } else {
        ball.style.left = "86%";
        distance.innerText = 1;
        commentary.innerText = `"So near! Surely they must score?!"`;
    }
    await sleep(1100);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add("hover:bg-green-500", "hover:text-white");
    }
}

/**
 * Function to run on goal scored
 */
async function goalScoredFunction() {
    let goalsUpdate = parseInt(goals.innerText);
    if (soundOn) {
        goalAudio.play();
    }
    commentary.innerText = `"It's a GOOOAAAAL!!"`;
    ball.style.left = "90%";
    goalsUpdate = goalsUpdate + 1;
    goals.innerText = goalsUpdate;
    await sleep(1500);
    returnBall();
}
/** 
 * Function to run on missed shot 
 */
function missedShotFunction(missedPosition) {
    if (soundOn) {
        missedShot.play();
    }
    if (missedPosition === 60) {
        commentary.innerText = `"You'll never score from that far out!"`;
    } else if (missedPosition === 40) {
        commentary.innerText = `"Bad luck but you're still a long way from goal."`;
    } else if (missedPosition === 20) {
        commentary.innerText = `"Getting closer, but you could still be nearer."`;
    } else if (missedPosition === 10) {
        commentary.innerText = `"Oh bad luck! That was quite a good chance!"`;
    } else {
        commentary.innerText = `"Oh no! You missed a brilliant chance!"`;
    }
    returnBall();
}

/**
 * Function to return the ball to the starting position
 */
async function returnBall() {
    ball.classList.remove("visible");
    ball.classList.add("invisible");
    await sleep(800);
    ball.style.transition = "none";
    ball.style.left = "10%";
    await sleep(1500);
    distance.innerText = 60;
    ball.classList.remove("invisible");
    ball.classList.add("visible");
    commentary.innerText = `"Time for another attack..."`;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.add("hover:bg-green-500", "hover:text-white");
    }
}

/**
 * Function to add pauses when required
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function to check if document is hidden
 */
function isDocumentHidden() {
    return document.hidden || document.visibilityState === "hidden";
}