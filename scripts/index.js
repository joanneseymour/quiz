
var secondsLeft = 10;
var minutesLeft = 0;
var updateTimerTime;
// var stopButton = document.getElementById("stopButton");
var startButton = document.getElementById("startButton");
var timer = document.getElementById("timer");
var refreshPageTime;

startButton.onclick = function () {
  updateTimerTime = setInterval(updateTimer, 1000);
  nextButton.style = "display: block;"
};

// stopButton.onclick = function () {
//   clearInterval(time);
// };

function updateTimer() {
  secondsLeft = secondsLeft - 1;
  minutesLeft = Math.floor(secondsLeft / 60);
  remainder = secondsLeft % 60;
  timer.innerHTML = minutesLeft.toString() + " min " + remainder.toString() + " sec";
  if (secondsLeft == 0){
    clearInterval(updateTimerTime);
    if (!isDone){
      showScore(0);
    }

  }
}

var isDone = false;

function refreshPage(){

  clearInterval(refreshPageTime);  
  window.location.reload(true);
}

var nextButton = document.getElementById("nextButton");
nextButton.style = "display: none";
var quiz = document.getElementById("quiz");
var randomQuestions = [];
var randomQuestionsIndex = -1;
var score = 0;

var questions = [
  "How many bones are there in the human body?</h5><div class = 'radio'><label><input type = 'radio' name = 'q1'> A. 200</label></div><div class = 'radio' name = 'q1'><label><input type = 'radio' name = 'q1'> B. 202</label></div><div class = 'radio'><label><input type = 'radio' name = 'q1'> C. 204</label></div><div class = 'radio'><label><input type = 'radio' name = 'q1' class = 'correct'> D. 206</label></div>",

  "Choose the correct HTML tag for the largest heading.</h5><div class = 'radio'><label><input type = 'radio'  name = 'q2' class = 'correct'> A. H1</label></div><div class = 'radio'><label><input type = 'radio' name = 'q2'> B. Heading</label></div><div class = 'radio'><label><input type = 'radio' name = 'q2'> C. Head</label></div><div class = 'radio'><label><input type = 'radio' name = 'q2'> D. H6</label></div>",

  "Which is the world's largest land mammal?</h5><div class = 'radio'><label><input type = 'radio' name = 'q3'> A. Whale</label></div><div class = 'radio'><label><input type = 'radio'  name = 'q3'> B. Elephant</label></div><div class='radio' name = 'q3'><label><input type = 'radio'  name = 'q3' class = 'correct'> C. Rhino</label></div><div class = 'radio'><label><input type = 'radio' name = 'q3'> D. Hippo</label></div>",
];

function randomiseQuestions() {
  var randomQuestion;
  for (i = 0; i < questions.length; i++) {
    randomQuestion = questions[getRandomNumber(0, 2)];
    if (randomQuestions.includes(randomQuestion)) {
      i = i - 1;
    } else {
      randomQuestions.push(randomQuestion);
    }
  }
  randomQuestions[0] = "<h5>1. " + randomQuestions[0];
  randomQuestions[1] = "<h5>2. " + randomQuestions[1];
  randomQuestions[2] = "<h5>3. " + randomQuestions[2];
  showQuestion();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showQuestion(){
  console.log(randomQuestionsIndex);
  randomQuestionsIndex ++;
  quiz.innerHTML = randomQuestions[randomQuestionsIndex];
  if (randomQuestionsIndex == randomQuestions.length - 1){
    nextButton.innerText = "Submit";
  }
}

nextButton.onclick = function(){
  addScore();
  if (randomQuestionsIndex != randomQuestions.length-1){
    showQuestion();
  } else {
    nextButton.style = "display: none";
    isDone = true;
    showScore(3000);
  }
}

function addScore(){
  var radioButtons = document.querySelectorAll("input[type = 'radio']");
  for (i = 0; i < radioButtons.length; i++){
      if ((radioButtons[i].checked) && (radioButtons[i].className == 'correct')){
          score++;
      }
  }
  console.log("Your score is " + score);
}

function showScore(refreshAfter){

    quiz.innerHTML = "<h3>Your score is " + score + "<h3>";
    refreshPageTime = setInterval(refreshPage, refreshAfter);
    }


randomiseQuestions();
