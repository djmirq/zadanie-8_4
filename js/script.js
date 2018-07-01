"use strict";

var player1NameDiv = document.getElementById("player1_name");
var player1Name;

var maxRounds = 10;
var currentRound = 1;
var computerMove = 0;
var playerScore = 0;
var computerScore = 0;
var gameLocked = false;

var newGameButton = document.getElementById("new_game_button");

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
NameCheck();
NewGame();

newGameButton.addEventListener("click", function() {
  maxRounds = "";
  while (isInteger(maxRounds) == false) {
    maxRounds = window.prompt("How Many Rounds Wins The Game?");
    if (isInteger(maxRounds) == false) {
      window.alert("Please enter correct number");
    }
  }
  NewGame();
});

//Name Prompt
function NameCheck() {
    while (isEmpty(player1Name)) {
        player1Name = window.prompt("Witamy w grze KAM NOŻYCE PAPIER! Podaj Swoje Imię lub nick", "Player One");
        if (isEmpty(player1Name)) {
            window.alert("Please enter correct name");
        }
    }
    player1NameDiv.innerHTML = player1Name;
}

//New Game
function NewGame() {
  winnerNumberOfRoundsInfo.innerHTML = maxRounds + " Won Rounds End The Game";
  currentRound = 1;
  Round();
  playerScore = 0;
  computerScore = 0;
  Score();
  outputMsg.innerHTML =
    "Witamy w grze !!! <br><br> Aby rozpocząć, kliknij New GAME <br> Następnie wybierz po lewej stronie symbol" +
    "<br><br>";
  ResetButtonsState();
  gameLocked = false;
}

//Buttons Listeners
player1Rock.addEventListener("click", function() {
  ResetButtonsState();
  this.style.border = "solid 5px #AA00FF";
  playerMove(1);
});
player1Scissors.addEventListener("click", function() {
  ResetButtonsState();
  this.style.border = "solid 5px #AA00FF";
  playerMove(2);
});
player1Paper.addEventListener("click", function() {
  ResetButtonsState();
  this.style.border = "solid 5px #AA00FF";
  playerMove(3);
});

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
function playerMove(playerMoveNumber) {
  if (outputMsg.innerHTML.indexOf("GAME OVER") == -1) {
    if (gameLocked) {
      outputMsg.innerHTML += newLine(
        "GAME OVER, please press the New GAME button"
      );
      return;
    }
  } else {
    return;
  }

  switch (playerMoveNumber) {
    case 1:
      outputMsg.innerHTML = newLine(player1Name + " choose ROCK");
      break;
    case 2:
      outputMsg.innerHTML = newLine(player1Name + " choose SCISSORS");
      break;
    case 3:
      outputMsg.innerHTML = newLine(player1Name + " choose PAPER");
      break;
  }
  
  Winner(playerMoveNumber, ComputerMove());
  Score();
  Round();
}

//Computer Move
function ComputerMove() {
  var computerMoveNumber = Math.floor(Math.random() * 3 + 1);

  switch (computerMoveNumber) {
    case 1:
      outputMsg.innerHTML += newLine("Computer choose ROCK");
      player2Rock.style.border = "solid 5px #AA00FF";
      break;
    case 2:
      outputMsg.innerHTML += newLine("Computer choose SCISSORS");
      player2Scissors.style.border = "solid 5px #AA00FF";
      break;
    case 3:
      outputMsg.innerHTML += newLine("Computer choose PAPER");
      player2Paper.style.border = "solid 5px #AA00FF";
      break;
  }
  return computerMoveNumber;
}

//and The Winner Is...
function Winner(playerMoveNumber, computerMoveNumber) {
    
  switch (playerMoveNumber) {
    case 1:
      switch (computerMoveNumber) {
        case 1:
          outputMsg.innerHTML += newLine("DRAW");
          break;
        case 2:
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played ROCK, computer played SCISSORS"
          );
          playerScore++;
          break;
        case 3:
          outputMsg.innerHTML += newLine(
            "YOU LOST :(<br> You played ROCK, computer played PAPER"
          );
          computerScore++;
          break;
      }
      break;
    case 2:
      switch (computerMoveNumber) {
        case 1:
          outputMsg.innerHTML += newLine(
            newLine("YOU LOST :(<br> You played SCISSORS, computer played ROCK")
          );
          computerScore++;
          break;
        case 2:
          outputMsg.innerHTML += newLine("DRAW");
          break;
        case 3:
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played SCISSORS, computer played PAPER"
          );
          playerScore++;
          break;
      }
      break;
    case 3:
      switch (computerMoveNumber) {
        case 1:
          outputMsg.innerHTML += newLine(
            "YOU WON :)<br> You played PAPER, computer played ROCK"
          );
          playerScore++;
          break;
        case 2:
          outputMsg.innerHTML += newLine(
            "YOU LOST :(<br> You played PAPER, computer played SCISSORS"
          );
          computerScore++;
          break;
        case 3:
          outputMsg.innerHTML += newLine("DRAW");
          break;
      }
      break;
  }
}

//Total Score
function Score() {
  outputScore.innerHTML = "Score: " + playerScore + " - " + computerScore;
  if (playerScore == maxRounds) {
    outputMsg.innerHTML = newLine(
      "CONGRATULATIONS !!!<br><br>YOU WON THE ENTIRE GAME !!!"
    );
    gameLocked = true;
  }
  if (computerScore == maxRounds) {
    outputMsg.innerHTML = newLine("YOU LOSE ;(<br> BETTER LUCK NEXT TIME !!!");
    gameLocked = true;
  }
}
//Round Num
function Round() {
  outputRounds.innerHTML = "Round: " + currentRound++;
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
