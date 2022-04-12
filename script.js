const startbtn = document.getElementById('start-btn');
const nextbtn = document.getElementById('next-btn');
const restartbtn = document.getElementById('restart-btn');
const main = document.querySelector('.main');
const title = document.querySelector(".title");
const optionBtns = document.querySelectorAll('.option');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const score = document.getElementById('score');
const questionContainer = document.getElementById('question-container');
const optionContainer = document.getElementById('option-container');
const scoreboardContainer = document.getElementById('scoreboard-container');

import questions from './res/questions.js';

let QUESTIONS = shuffleArray(questions);

const totalQuestions = questions.length;
let currentQuestionAt = 0,
currentCorrectAnswer = "",
currentScore = 0;

startbtn.addEventListener('click', startGame);
restartbtn.addEventListener('click', ()=>{
  QUESTIONS = [];
  QUESTIONS = shuffleArray(questions);
  startGame();
});
nextbtn.addEventListener('click', ()=>{
  const lastQuestionAt = (QUESTIONS.length - 1);
  if(currentQuestionAt === lastQuestionAt){
    displayFinalScore();
  }
  else{
    askNextQuestion();
  }
});
optionBtns.forEach(optionBtn => {
  optionBtn.addEventListener('click', validateAnswer);
});

function startGame(){
  startbtn.classList.add('hide');
  restartbtn.classList.add('hide');
  nextbtn.classList.remove('hide');
  questionContainer.classList.remove('hide');
  optionContainer.classList.remove('hide');
  scoreboardContainer.classList.remove('hide');
  
  currentQuestionAt = 0;
  currentCorrectAnswer = "";
  currentScore = 0;
  score.innerText = `${currentScore} / ${totalQuestions}`;
  askFirstQuestion();
}

function shuffleArray(item){
  return item.sort(()=>Math.random() - 0.5);
}

function askFirstQuestion(){
  const firstQuestion = QUESTIONS[currentQuestionAt];
  displayQuestion(firstQuestion);
}

function askNextQuestion(){
  currentQuestionAt++;
  let nextQuestion = QUESTIONS[currentQuestionAt];
  displayQuestion(nextQuestion);
}

function displayQuestion(thisQuestion){
  question.innerText = thisQuestion.question;
  let shuffledQuestionOptions = shuffleArray(thisQuestion.options);

  for(let j=0; j<optionBtns.length; j++){
    for(let i=0; i<shuffledQuestionOptions.length; i++)
    {
      if(j===i){
        optionBtns[j].innerText = shuffledQuestionOptions[i];
      }
    }
  }
  title.innerText = "Select your answer";
  answer.innerText = "";
  answer.classList.add('hide');
  currentCorrectAnswer = thisQuestion.answer;
  nextbtn.disabled=true;
  resetMainScreen();
  resetsOptions();
}

function resetMainScreen(){
  if (main.classList.contains("correct")) {
    main.classList.remove("correct");
  }
  if (main.classList.contains("wrong")) {
    main.classList.remove("wrong");
  }
}

function resetsOptions(){
  optionBtns.forEach(optionBtn => {
    if (optionBtn.classList.contains("selected")) {
      optionBtn.classList.remove("selected");
    }
    if (optionBtn.classList.contains("wrong")) {
      optionBtn.classList.remove("wrong");
    }
    if (optionBtn.classList.contains("correct")) {
      optionBtn.classList.remove("correct");
    }
    optionBtn.disabled = false;
  });
}

function validateAnswer(e){
  const selectedOption = e.target;
  const isAnswerCorrect = checkOption(selectedOption.innerText);
  displayResult(isAnswerCorrect, selectedOption);
}

function checkOption(selectedOption){
  if(selectedOption === currentCorrectAnswer) {
    currentScore++;
    return true;
  }
  else {return false;}
}

function displayResult(isAnswerCorrect, selectedOption){
  if (isAnswerCorrect) {
    selectedOption.classList.add("selected", "correct");
    optionBtns.forEach(optionBtn => {
      if (optionBtn != selectedOption) {
        optionBtn.classList.add("wrong");
        optionBtn.disabled = true;
      }
      optionBtn.disabled = true;
    });
    main.classList.add('correct');
  }
  else {
    selectedOption.classList.add("selected", "wrong");
    const correctOption = findCorrectOption();
    optionBtns.forEach(optionBtn => {
      if (optionBtn != selectedOption && optionBtn != correctOption){
        optionBtn.classList.add("wrong");
      }
      if(optionBtn.innerText === currentCorrectAnswer){
        optionBtn.classList.add("correct");        
      }
      optionBtn.disabled = true;
    });
    main.classList.add("correct");
  }
  answer.classList.remove('hide');
  answer.innerText = currentCorrectAnswer;
  score.innerText = `${currentScore} / ${totalQuestions}`;
  nextbtn.disabled=false;
}

function findCorrectOption(){
  let correctOption;
  optionBtns.forEach(optionBtn =>{
    if (optionBtn.innerText === currentCorrectAnswer) {
      correctOption = optionBtn;
    }
  });  
  return correctOption;
}

function displayFinalScore(){
  title.innerText = "Quiz Ended";
  restartbtn.classList.remove("hide");
  nextbtn.classList.add("hide");
  questionContainer.classList.add("hide");
  optionContainer.classList.add("hide");
  resetMainScreen();
}