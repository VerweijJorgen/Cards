// script.js

document.addEventListener("DOMContentLoaded", function() {
  const startScreen = document.getElementById("start-screen");
  const questionContainer = document.getElementById("question-container");
  const answerExplanation = document.getElementById("answer-explanation");
  const endScreen = document.getElementById("end-screen");
  const startBtn = document.getElementById("start-btn");
  const nextQuestionBtn = document.getElementById("next-question-btn");

  let currentQuestionIndex = 0;
  let questions = [];

  // Functie om vragen en antwoorden te laden vanuit JSON-bestand
  function loadQuestions(callback) {
    fetch("questions.json")
      .then(response => response.json())
      .then(data => {
        questions = data.questions;
        callback();
      })
      // .catch(error => console.error("Error fetching questions:", error));
  }

  // Functie om het spel te starten
  function startGame() {
    startScreen.style.display = "none";
    questionContainer.style.display = "flex";
    displayQuestion();
  }

  // Functie om vraag en antwoorden te tonen
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <a href="/" class="game__logo game__logo--small">Cards Against Exclusion</a>
      <div class="game__card">
        <h2 class="game__question">${currentQuestion.question}</h2>
        <p class="game__text">${currentQuestion.description}</p>
       </div>
    `;
    const answersContainer = document.createElement("div");
    answersContainer.id = "answers";
    answersContainer.classList.add("game__answers");
    currentQuestion.answers.forEach((answer, index) => {
      const answerElement = document.createElement("button");
      answerElement.classList.add("game__btn");
      answerElement.setAttribute('type', 'button');
      answerElement.textContent = answer;
      answerElement.addEventListener("click", () => showExplanation());
      answersContainer.appendChild(answerElement);
    });
    questionContainer.appendChild(answersContainer);
  }

  // Functie om uitleg te tonen na het selecteren van een antwoord
  function showExplanation() {
    const currentQuestion = questions[currentQuestionIndex];
    answerExplanation.style.display = "flex";
    document.getElementById("explanation-title").textContent = currentQuestion.explanation.title;
    document.getElementById("explanation-text").textContent = currentQuestion.explanation.text;
    document.getElementById("explanation-html").innerHTML = currentQuestion.explanation.html; 
  }

  // Functie om door te gaan naar de volgende vraag
  function nextQuestion() {
    answerExplanation.style.display = "none";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }

  // Functie om het spel te eindigen
  function endGame() {
    questionContainer.style.display = "none";
    endScreen.style.display = "flex";
  }

  // Event listener voor de knop "Start het spel"
  startBtn.addEventListener("click", startGame);

  // Event listener voor de knop "Volgende vraag"
  nextQuestionBtn.addEventListener("click", nextQuestion);

  // Vragen laden zodra de pagina geladen is
  loadQuestions();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js")
      .then(registration => console.log("Service Worker registered"))
      .catch(error => console.error("Service Worker registration failed:", error));
  });
}
