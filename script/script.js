// html elements
const buttons = document.querySelectorAll(".choiceBtn");
const winLabel = document.getElementById("win"), 
    looseLabel = document.getElementById("loose"), 
    drawLabel = document.getElementById("draw");
const resultLabel = document.getElementById("resultat");
const resetBtn = document.getElementById("resetBtn");

// const name items
const win = "win", draw = "draw", loose = "loose";
const pierre = "pierre", papier = "papier", ciseau = "ciseau";

// score
const score = {"win":0, "loose":0, "draw":0};


// check win/draw/loose
function checkResult(player, robot) {
    if (player == robot)
        return draw;
    
    if (player == pierre && robot == papier) return loose;
    if (player == pierre && robot == ciseau) return win;
    if (player == papier && robot == pierre) return win;
    if (player == papier && robot == ciseau) return loose;
    if (player == ciseau && robot == pierre) return loose;
    if (player == ciseau && robot == papier) return win;
}

// robot choice
function createRobotChoice() {
    const num = (Math.random() * 10 % 3).toFixed(0);  // choice between 0 and 2 (inclued)
    if (num == 0) return pierre;
    else if (num == 1) return papier;
    else return ciseau;
}

// update score
function updateScore() {
    winLabel.textContent = score[win] + " victoires";
    looseLabel.textContent = score[loose] + " défaites";
    drawLabel.textContent = score[draw] + " égalités";
}

// tell wath has been played
function tellWthPlayed(player, robot, result) {
    const strResult = result == win ? "Vous avez <strong>gagné</strong>." : result == loose ? "Vous avez <strong>perdus</strong>." : "C'était un <strong>match null</strong>."
    resultLabel.innerHTML = "Vous avez joué : <strong>" + player + "</strong>. Le robot a joué: <strong>" + robot + "</strong>. " + strResult;
}

// principal function for the buttons
function buttonHandler(button) {
    const player = button.textContent;
    const robot = createRobotChoice();
    const result = checkResult(player, robot);

    score[result]++;
    updateScore();
    tellWthPlayed(player, robot, result);
}

buttons.forEach(button => {
    button.addEventListener('click', () => buttonHandler(button));
});

// reset score
resetBtn.addEventListener('click', () => {
    score[win] = 0;
    score[loose] = 0;
    score[draw] = 0;
    updateScore();
    resultLabel.innerHTML = "";
});
