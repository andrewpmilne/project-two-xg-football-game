const startButton = document.getElementById("start-game");
startButton.addEventListener("click", startGame);

function startGame() {
    console.log("start");
    let timeRemaining = parseInt(document.getElementById("time").innerText);

    let countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById("time").innerText = timeRemaining;
        } else {
            console.log("time is up")
        }
    }, 1000);
}