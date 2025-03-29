let currentQuestions = 0;
let amountOfRightAnswers = 0;
let audioSuccess = new Audio('mp3/success_1sec.mp3')
let audioWrong = new Audio('mp3/wrong.mp3')

function init() {
    renderCurrentQuestions();
    progressBar();
};

function AmountofQuestions() {
    document.getElementById("amount-questions").innerHTML = questions.length
    document.getElementById("counter-questions").innerHTML = currentQuestions + 1
}

function renderCurrentQuestions() {
    if (currentQuestions >= questions.length) {
        endScreen()
    } else {
        AmountofQuestions();
        let CurrentQuestion = questions[currentQuestions].question;
        let ContentRef = document.getElementById("card-title")
        ContentRef.innerHTML = `${CurrentQuestion}`;
        renderAnswer();
    }
};

function renderAnswer() {
    document.getElementById("answer_1").innerHTML = questions[currentQuestions].answer_1;
    document.getElementById("answer_2").innerHTML = questions[currentQuestions].answer_2;
    document.getElementById("answer_3").innerHTML = questions[currentQuestions].answer_3;
    document.getElementById("answer_4").innerHTML = questions[currentQuestions].answer_4;
};

function checkAnswer(choice) {
    let choiceElement = document.getElementById(choice)
    let rightAnswerNumber = questions[currentQuestions].right_answer;
    let choiceNumber = choice.slice(-1);
    let rightAnswerID = "answer_" + rightAnswerNumber;

    if (rightAnswerNumber == choiceNumber) {
        rightAnswer(choiceElement)
    } else {
        falseAnswer(choiceElement, rightAnswerID)
    }
    anabled();
};

function nextQuestion() {
    currentQuestions = currentQuestions + 1;
    endGame();
    resetClass();
    init();
};

function anabled() {
    document.getElementById("Button-next").disabled = false;
}

function answeredCorrectly() {
    document.getElementById("amount-questions-endScreen").innerHTML = questions.length;
    document.getElementById("amount-of-right-answers").innerHTML = amountOfRightAnswers;
};

function progressBar() {
    progress = (currentQuestions + 1) / questions.length;
    progress = Math.round(progress * 100);

    document.getElementById('progress-bar').innerText = `${progress + "%"}`
    document.getElementById('progress-bar').style.width = `${progress + "%"}`
};

function rightAnswer(choiceElement) {
    choiceElement.parentNode.classList.add("right-answer");
    amountOfRightAnswers++
    audioSuccess.play()
}

function falseAnswer(choiceElement, rightAnswerID) {
    choiceElement.parentNode.classList.add("falsh-answer")
    document.getElementById(rightAnswerID).parentNode.classList.add("right-answer")
    audioWrong.play()
}

function endScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionScreen').style = 'display: none';
    answeredCorrectly();
}

function endGame() {
    if (currentQuestions >= questions.length - 1) {
        document.getElementById("Button-next").textContent = `zur Auswertung`
    }
};

function restart() {
    currentQuestions = 0;
    amountOfRightAnswers = 0;

    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionScreen').style = '';

    init();
};

function resetClass() {
    document.getElementById("Button-next").disabled = true;
    document.getElementById("answer_1").parentNode.classList.remove("right-answer", "falsh-answer")
    document.getElementById("answer_2").parentNode.classList.remove("right-answer", "falsh-answer")
    document.getElementById("answer_3").parentNode.classList.remove("right-answer", "falsh-answer")
    document.getElementById("answer_4").parentNode.classList.remove("right-answer", "falsh-answer")
};