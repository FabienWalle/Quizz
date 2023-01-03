function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

const savedAnswers = [
    ["De se prendre une bombe nucléaire.", "De se faire assassiner.", "De tomber amoureux.", "De ressembler à Super Mario."],
    ["Il est zoophile.", "Il est pigiste au Figaro.", "Il est cocaïnomane.", "Il mange ses crottes de nez."],
    ["Jackie Chan a enregistré 20 albums.", "Bruce Lee a écrit 20 livres.", "Steven Seagal a construit 20 maisons.", "Chuck Norris a peint 20 autoportraits avec ses poings."],
    ["Des chevaliers du Moyen Âge qui passaient une nuit à prier, habillés en blanc avant leur adoubement.", "Des femmes de la cour sous Louis XIV, qui avaient le visage poudré de blanc pour des soirées qui duraient jusqu’au petit matin.", "Des soldats américains qui prenaient de la coke pendant la guerre de 39-45.", "Du cardinal de Richelieu qui avait pris la Dame Blanche en stop et l’aurait honorée toute la nuit."],
    ["« Le musée du cafard » à Plano , Texas.", "« Le musée Jacques Chirac », à Tulle en Corrèze.", "« Le musée des déchets » à Finsig, Allemagne.", "« Le musée des CRS », à Vélizy."],
]
const savedQuestions = [
    "Quelle était la plus grande peur de Staline ?", "Quel est le vice caché de Sherlock Holmes?", "Une seule de ces affirmations sur ces acteurs champions d'arts martiaux est complètement vraie, laquelle ?", "D'où vient l'expression 'passer une nuit blanche' ?", "Quel musée n'existe pas parmi les musées suivants ?",
]
const goodanswers = ["De se faire assassiner.", "Il est cocaïnomane.", "Jackie Chan a enregistré 20 albums.", "Des chevaliers du Moyen Âge qui passaient une nuit à prier, habillés en blanc avant leur adoubement.", "« Le musée Jacques Chirac », à Tulle en Corrèze.",];
// les tableaux de base 

let answers = [];
let questions = [];
// tables mutables

let question = "";
let buttonOne = "";
let buttonTwo = "";
let buttonThree = "";
let buttonFour = "";
// les zones de texte à remplir

let time;
let timeInterval;
// variables pour le timer

let score = 0;
let N = 0;
let R = 0;
// autres variables

// let game = `<div id="questionText"></div>
// <div id="progress">
//     <span id="progress-inner"></span>
// </div>
// <div class="buttongroup">
//     <span><button class="answerButton" id="buttonOne" onclick="answerNumber(this)"></button></span>
//     <span><button class="answerButton" id="buttonTwo" onclick="answerNumber(this)"></button></span>
//     <span><button class="answerButton" id="buttonThree" onclick="answerNumber(this)"></button></span>
//     <span><button class="answerButton" id="buttonFour" onclick="answerNumber(this)"></button></span>
// </div>`
// pour créer la div game

function gameBis() {
    let containerQuestion = document.createElement('div');
    containerQuestion.setAttribute("id", "questionText");
    document.querySelector("main").appendChild(containerQuestion);

    let containerProgress = document.createElement('div');
    containerProgress.setAttribute("id", "progress");
    document.querySelector("main").appendChild(containerProgress);
    containerQuestion.after(containerProgress);

    let spanProgress = document.createElement('span');
    spanProgress.setAttribute("id", "progress-inner");
    containerProgress.appendChild(spanProgress);

    let containerButtonGroup = document.createElement('div');
    containerButtonGroup.setAttribute("class", "buttongroup");
    document.querySelector("main").appendChild(containerButtonGroup);
    containerProgress.after(containerButtonGroup);

    let spanOne = document.createElement('span');
    document.querySelector("main").appendChild(spanOne);
    containerButtonGroup.appendChild(spanOne);

    let buttonOne = document.createElement('button');
    buttonOne.setAttribute("class", "answerButton");
    buttonOne.setAttribute("id", "buttonOne");
    buttonOne.setAttribute("onclick", "answerNumber(this)");
    document.querySelector("main").appendChild(buttonOne);
    spanOne.appendChild(buttonOne);

    let spanTwo = document.createElement('span');
    document.querySelector("main").appendChild(spanTwo);
    containerButtonGroup.appendChild(spanTwo);
    spanOne.after(spanTwo);

    let buttonTwo = document.createElement('button');
    buttonTwo.setAttribute("class", "answerButton");
    buttonTwo.setAttribute("id", "buttonTwo");
    buttonTwo.setAttribute("onclick", "answerNumber(this)");
    document.querySelector("main").appendChild(buttonTwo);
    spanTwo.appendChild(buttonTwo);

    let spanThree = document.createElement('span');
    document.querySelector("main").appendChild(spanThree);
    containerButtonGroup.appendChild(spanThree);
    spanTwo.after(spanThree);

    let buttonThree = document.createElement('button');
    buttonThree.setAttribute("class", "answerButton");
    buttonThree.setAttribute("id", "buttonThree");
    buttonThree.setAttribute("onclick", "answerNumber(this)");
    document.querySelector("main").appendChild(buttonThree);
    spanThree.appendChild(buttonThree);

    let spanFour = document.createElement('span');
    document.querySelector("main").appendChild(spanFour);
    containerButtonGroup.appendChild(spanFour);
    spanThree.after(spanFour);

    let buttonFour = document.createElement('button');
    buttonFour.setAttribute("class", "answerButton");
    buttonFour.setAttribute("id", "buttonFour");
    buttonFour.setAttribute("onclick", "answerNumber(this)");
    document.querySelector("main").appendChild(buttonFour);
    spanFour.appendChild(buttonFour);
}
//créer la div sans backtick la partie html

function gameOver() {
let block = document.createElement('div');
document.querySelector("main").appendChild(block);
let fontGameOver = document.createElement('h2');
fontGameOver.setAttribute("id", "gameOver");
document.querySelector("main").appendChild(fontGameOver);
block.appendChild(fontGameOver);
document.querySelector('#gameOver').innerText="GAME OVER";
}
// fonction pour mettre le texte de game over

// let gameOver = `<div><h2>GAME OVER</h2></div>`;
// message de game over

let progressWidth;
//variables pour la progress bar

function reset() {
    document.querySelector('main').innerHTML = "";
    window.clearInterval(timeInterval);
    score = 0;
    document.querySelector('#scoreNumber').innerText = score;
};

function start() {
    gameBis();
    // document.querySelector('main').innerHTML = game;
    time = 10;
    timeInterval = window.setInterval(function () {
        progressWidth = (time / 10) * 100;
        time--;
        if (time < 0) {
            document.querySelector('main').innerHTML = '';
            // document.querySelector('main').innerHTML = gameOver;
            gameOver();
            window.clearInterval(timeInterval);
            document.querySelector("#progress-inner").style.width = 0 + "%";
        } else if (time > 0) {
            document.querySelector("#progress-inner").style.width = progressWidth + "%";
            checkColors(progressWidth);
        }
    }, 1000);
    answers = [...savedAnswers];
    questions = [...savedQuestions];
    nextQuestion();
};

function nextQuestion() {
    N = questions.length - 1;
    R = randomNumber(0, N);
    time = 10;
    if (N > -1) {
        question = questions[R];
        buttonOne = answers[R][0];
        buttonTwo = answers[R][1];
        buttonThree = answers[R][2];
        buttonFour = answers[R][3];
        document.querySelector('#questionText').innerText = question;
        document.querySelector('#buttonOne').innerText = buttonOne;
        document.querySelector('#buttonTwo').innerText = buttonTwo;
        document.querySelector('#buttonThree').innerText = buttonThree;
        document.querySelector('#buttonFour').innerText = buttonFour;
        answers.splice(R, 1);
        questions.splice(R, 1);
    } else {
        window.clearInterval(timeInterval);
        document.querySelector('main').innerHTML = '';
        // document.querySelector('main').innerHTML = gameOver;
        gameOver();
    };
}

function answerNumber(element) {
    for (let i = 0; i < 5; i++) {
        if (element.innerText == goodanswers[i]) {
            score++;
        };
    }
    time = 10;
    document.querySelector('#scoreNumber').innerText = score;
    nextQuestion();
}

const checkColors = (width) => {
    if (width > 60) {
        document.querySelector("#progress-inner").style.background = "green";
    } else if (width > 30) {
        document.querySelector("#progress-inner").style.background = "yellow";
    } else {
        document.querySelector("#progress-inner").style.background = "red"
    }
}


