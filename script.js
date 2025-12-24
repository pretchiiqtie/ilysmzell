let yourScore = 0;
let opponentScore = 0;
let you;
let opponent;

let choices = ["rock", "paper", "scissors"];
let yourChoice0;
let yourChoice1;
let oppponentChoice0;
let oppponentChoice1;
let instruction;
let nextBtn;
let gameResult;

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        // <img id="rock" src="rock.png">
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }

    yourChoice0 = document.getElementById("your-choice0");
    yourChoice1 = document.getElementById("your-choice1");
    oppponentChoice0 = document.getElementById("opponent-choice0");
    oppponentChoice1 = document.getElementById("opponent-choice1");

    yourChoice0.addEventListener("click", minusOne);
    yourChoice1.addEventListener("click", minusOne);

    instruction = document.getElementById("instruction");

    nextBtn = document.querySelector(".cnii");
    gameResult = document.getElementById("game-result");

    nextBtn.addEventListener("click", function () {
        window.location.href = "next.html"; // go to next HTML file
    });
}

function selectChoice() {
    if (yourChoice0.src.includes("empty")) {
        yourChoice0.src = this.id + ".png";
    }
    else {
        yourChoice1.src = this.id + ".png";
        //random for oppponent
        for (let i = 0; i < 2; i++) {
            let opponentChoice = choices[Math.floor(Math.random() * 3)]; //0- .999999 * 3 = 0-2.99999
            document.getElementById(`opponent-choice${i}`).src = opponentChoice + ".png";
        }

        document.getElementById("choices").hidden = true;
        instruction.innerText = "Minus One!";
    }
}

function minusOne() {
    if (!yourChoice0.src.includes("empty") && !yourChoice1.src.includes("empty") && !you && !opponent) {
        if (this == yourChoice0) {
            yourChoice1.hidden = true;
        }

        else {
            yourChoice0.hidden = true;
        }

        let n = Math.floor(Math.random()*2);
        let opponentChoice;

        if (n == 0) {
            opponentChoice = oppponentChoice0;
            oppponentChoice1.hidden = true;
        }
        else {
            opponentChoice = oppponentChoice1;
            oppponentChoice0.hidden = true;
        }

        //assign final value to you and opponent
        for (let i = 0; i < choices.length; i++) {
            if (getImgName(this).includes(choices[i])) {
                you = choices[i];
            }
            if (getImgName(opponentChoice).includes(choices[i])) {
                opponent = choices[i]; 
            }
        }
        checkWinner();
    }
}

function checkWinner() {
    if (you != opponent) {
        if (you == "rock") {
            if (opponent == "scissors") {
                yourScore += 1;
            }
            else if (opponent == "paper") {
                opponentScore += 1;
            }
        }
        else if (you == "scissors") {
            if (opponent == "paper") {
                yourScore += 1;
            }
            else if (opponent == "rock") {
                opponentScore += 1;
            }
        }
        else if (you == "paper") {
            if (opponent == "rock") {
                yourScore += 1;
            }
            else if (opponent == "scissors") {
                opponentScore += 1;
            }
        }
    }
    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("opponent-score").innerText = opponentScore;

    if (yourScore === 5) {
        endGame("You Win! 🎉");
        return;
    }
    else if (opponentScore === 5) {
        endGame("Opponent Wins 😢");
        return;
    }

    setTimeout(clearChoices, 1500);
}

function clearChoices() {
    you = null;
    opponent = null;
    oppponentChoice0.src = "empty.png";
    oppponentChoice1.src = "empty.png";
    yourChoice0.src = "empty.png";
    yourChoice1.src = "empty.png";

    oppponentChoice0.hidden = false;
    oppponentChoice1.hidden = false;
    yourChoice0.hidden = false;
    yourChoice1.hidden = false;
    document.getElementById("choices").hidden = false;
    instruction.innerText = "Rock Paper Scissors!";
}

function getImgName(img) {
    let imgSrcArray = img.src.split("/");
    return imgSrcArray[imgSrcArray.length - 1];
}

function endGame(message) {
    instruction.innerText = "Congratulations!";
    document.getElementById("choices").hidden = true;

    gameResult.innerText = message;
    gameResult.hidden = false;

    nextBtn.hidden = false; // show your designed button
}