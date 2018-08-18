"use strict";

var player1NameDiv = document.getElementById("player1_name");

var params = {
  maxRounds: 10,
  currentRound: 1,
  playerScore: 0,
  computerScore: 0,
  gameLocked: false,
  player1Name: "",
  progres: {
    roundNumber: [],
    playerMove: [],
    computerMove: [],
    roundResult: [],
    currentScore: []
  }
};

var newGameButton = document.getElementById("new_game_button");
var submitButton = document.getElementById("paramsSubmitButton");

var player1Rock = document.getElementById("p1_rock");
var player1Scissors = document.getElementById("p1_scissors");
var player1Paper = document.getElementById("p1_paper");
var player2Rock = document.getElementById("p2_rock");
var player2Scissors = document.getElementById("p2_scissors");
var player2Paper = document.getElementById("p2_paper");

var outputMsg = document.getElementById("output");
var outputScore = document.getElementById("results");
var outputRounds = document.getElementById("rounds");
var winnerNumberOfRoundsInfo = document.getElementById("winner_info");

//Reset On Start or New Game Button
//NameCheck();
NewGame();

newGameButton.addEventListener("click", function() {
  // params.maxRounds = "";
  // while (isInteger(params.maxRounds) == false) {
  //   params.maxRounds = window.prompt("How Many Rounds Wins The Game?");
  //   if (isInteger(params.maxRounds) == false) {
  //     window.alert("Please enter correct number");
  //   }
  // }
  NewGame();
});

//submitButton.addEventListener("click", function() {

function myFunction() {
  event.preventDefault();

  params.player1Name = document.getElementById("name").value;
  player1NameDiv.innerHTML = params.player1Name;

  params.maxRounds = document.getElementById("roundsNum").value;

  document.querySelector("#modal-overlay").classList.remove("show");
}

//Name Prompt
//function NameCheck() {
// while (isEmpty(params.player1Name)) {
//   params.player1Name = window.prompt(
//     "Witamy w grze KAMIEŃ NOŻYCE PAPIER! Podaj Swoje Imię lub nick",
//     "Player One"
//   );
//   if (isEmpty(params.player1Name)) {
//     window.alert("Please enter correct name");
//   }
// }
// player1NameDiv.innerHTML = params.player1Name;
//}

//New Game
function NewGame() {
  Modal(1, "Witaj w nowej grze, proszę podaj dane:", "NOWA GRA !");

  params.gameLocked = false;
  winnerNumberOfRoundsInfo.innerHTML =
    params.maxRounds + " Won Rounds End The Game";
  params.currentRound = 1;
  Round();
  params.playerScore = 0;
  params.computerScore = 0;
  Score();
  outputMsg.innerHTML =
    "Witamy w grze !!! <br><br> Aby rozpocząć, kliknij New GAME <br> Następnie wybierz po lewej stronie symbol" +
    "<br><br>";
  ResetButtonsState();

  while (params.progres.currentScore.length > 0) {
    params.progres.roundNumber.pop();
    params.progres.playerMove.pop();
    params.progres.computerMove.pop();
    params.progres.currentScore.pop();
    params.progres.roundResult.pop();
  }
}

var playerMoveButtons = document.querySelectorAll(".player-move");

for (var i = 0; i < playerMoveButtons.length; i++) {
  playerMoveButtons[i].addEventListener("click", playerMove);
}

//Reset Buttons
function ResetButtonsState() {
  player1Rock.style.border = "solid 1px rgb(255, 255, 254)";
  player1Scissors.style.border = "solid 1px rgb(255, 255, 254)";
  player1Paper.style.border = "solid 1px rgb(255, 255, 254)";

  player2Rock.style.border = "solid 1px rgb(255, 255, 254)";
  player2Scissors.style.border = "solid 1px rgb(255, 255, 254)";
  player2Paper.style.border = "solid 1px rgb(255, 255, 254)";
}

//Player Move
function playerMove(event) {
  ResetButtonsState();

  event.target.style.border = "solid 5px #AA00FF";

  if (outputMsg.innerHTML.indexOf("GAME OVER") == -1) {
    if (params.gameLocked) {
      outputMsg.innerHTML += newLine(
        "GAME OVER, please press the New GAME button"
      );
      return;
    }
  } else {
    return;
  }

  var playerOneMove = event.target.getAttribute("data-move");
  outputMsg.innerHTML = newLine(
    params.player1Name + " choose " + playerOneMove
  );

  Winner(playerOneMove, ComputerMove());
  Progress();
  Score();
  Round();
}

//Computer Move
function ComputerMove() {
  var computerMoveNumber = Math.floor(Math.random() * 3 + 1);
  var moveName = "";

  switch (computerMoveNumber) {
    case 1:
      outputMsg.innerHTML += newLine("Computer choose ROCK");
      player2Rock.style.border = "solid 5px #AA00FF";
      moveName = "rock";
      break;
    case 2:
      outputMsg.innerHTML += newLine("Computer choose SCISSORS");
      player2Scissors.style.border = "solid 5px #AA00FF";
      moveName = "scissors";
      break;
    case 3:
      outputMsg.innerHTML += newLine("Computer choose PAPER");
      player2Paper.style.border = "solid 5px #AA00FF";
      moveName = "paper";
      break;
  }
  return moveName;
}

//and The Winner Is...
function Winner(playerMove, computerMove) {
  params.progres.playerMove.push(playerMove);
  params.progres.computerMove.push(computerMove);

  switch (playerMove) {
    case "rock":
      switch (computerMove) {
        case "rock":
          outputMsg.innerHTML += newLine("DRAW");
          params.progres.roundResult.push("0-0");
          break;
        case "scissors":
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played ROCK, computer played SCISSORS"
          );
          params.playerScore++;
          params.progres.roundResult.push("1-0");
          break;
        case "paper":
          outputMsg.innerHTML += newLine(
            "YOU LOST :(<br> You played ROCK, computer played PAPER"
          );
          params.computerScore++;
          params.progres.roundResult.push("0-1");
          break;
      }
      break;
    case "scissors":
      switch (computerMove) {
        case "rock":
          outputMsg.innerHTML += newLine(
            newLine("YOU LOST :(<br> You played SCISSORS, computer played ROCK")
          );
          params.computerScore++;
          params.progres.roundResult.push("0-1");
          break;
        case "scissors":
          outputMsg.innerHTML += newLine("DRAW");
          params.progres.roundResult.push("0-0");
          break;
        case "paper":
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played SCISSORS, computer played PAPER"
          );
          params.playerScore++;
          params.progres.roundResult.push("1-0");
          break;
      }
      break;
    case "paper":
      switch (computerMove) {
        case "rock":
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played PAPER, computer played ROCK"
          );
          params.playerScore++;
          params.progres.roundResult.push("1-0");
          break;
        case "scissors":
          outputMsg.innerHTML += newLine(
            "YOU LOST :(<br> You played PAPER, computer played SCISSORS"
          );
          params.computerScore++;
          params.progres.roundResult.push("0-1");
          break;
        case "paper":
          outputMsg.innerHTML += newLine("DRAW");
          params.progres.roundResult.push("0-0");
          break;
      }
      break;
  }
}

//Progress
function Progress() {
  params.progres.roundNumber.push(params.progres.currentScore.length + 1);
  params.progres.currentScore.push(
    params.playerScore + "-" + params.computerScore
  );
}

//Total Score
function Score() {
  var gameResult = "";

  var domstring = "<br>";
  domstring +=
    "<table><tr><th>Round No</th><th>Player Move</th><th>Computer Move</th><th>Round Results</th><th>Current Score</th></tr>";

  for (let i = 0; i < params.progres.currentScore.length; i++) {
    domstring += "<tr><td>" + params.progres.roundNumber[i] + "</td>";
    domstring += "<td>" + params.progres.playerMove[i] + "</td>";
    domstring += "<td>" + params.progres.computerMove[i] + "</td>";
    domstring += "<td>" + params.progres.roundResult[i] + "</td>";
    domstring += "<td>" + params.progres.currentScore[i] + "</td></tr>";
  }

  domstring += "</table>";
  // params.progres.currentScore.forEach(element => {
  //   domstring += '<tr><td>' + element + '</td></tr>';
  // });

  outputScore.innerHTML =
    "Score: " + params.playerScore + " - " + params.computerScore;
  if (params.playerScore == params.maxRounds) {
    gameResult = "CONGRATULATIONS !!!<br><br>YOU WON THE ENTIRE GAME !!!";
    // outputMsg.innerHTML = newLine("CONGRATULATIONS !!!<br><br>YOU WON THE ENTIRE GAME !!!");
    params.gameLocked = true;
  }
  if (params.computerScore == params.maxRounds) {
    gameResult = "YOU LOSE ;(<br> BETTER LUCK NEXT TIME !!!";
    // outputMsg.innerHTML = newLine("YOU LOSE ;(<br> BETTER LUCK NEXT TIME !!!");
    params.gameLocked = true;
  }

  if (params.gameLocked) {
    Modal(0, gameResult + domstring, "GAME OVER !");
  }
}

function Modal(modalNum, modalMsg, modalHeader) {
  var x = document.querySelector("#modal-overlay").getElementsByTagName("a");
  document.querySelector("#modal-overlay").classList.add("show");

  for (var i = 0; i < x.length; i++) {
    if (i == modalNum) {
      x[i].parentNode.classList.add("show");
      var head = document.querySelectorAll(".modal header");
      head[modalNum].innerHTML = modalHeader;
      var par = document.querySelectorAll(".modal p");
      par[modalNum].innerHTML = modalMsg;
    } else {
      x[i].parentNode.classList.remove("show");
    }
  }
}

//Round Num
function Round() {
  if (!params.gameLocked) {
    outputRounds.innerHTML = "Round: " + params.currentRound++;
  }
}

//<br>
function newLine(text) {
  if (text.length > 0) {
    return text + "<br>";
  } else {
    return text;
  }
}

//Number Of Rounds Check
function isInteger(x) {
  if (x == Math.round(x) && x >= 1) return true;
  return false;
}

//String check
function isEmpty(value) {
  return value == null || value === "";
}

var hideModal = function(event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

//document.querySelector('#modal-overlay').addEventListener('click', hideModal);
