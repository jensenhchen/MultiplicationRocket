(function () {
  "use strict";

  const RocketMath = window.RocketMath || {};
  const { safeText } = RocketMath.utils;

  const elements = {
    app: document.querySelector("#app"),
    startScreen: document.querySelector("#start-screen"),
    gameScreen: document.querySelector("#game-screen"),
    resultScreen: document.querySelector("#result-screen"),
    levelButtons: document.querySelectorAll("[data-level]"),
    resetProgressButton: document.querySelector("#reset-progress-button"),
    savedProgress: document.querySelector("#saved-progress"),
    weakTables: document.querySelector("#weak-tables"),
    questionNumber: document.querySelector("#question-number"),
    score: document.querySelector("#score"),
    timer: document.querySelector("#timer"),
    rocket: document.querySelector("#rocket"),
    questionText: document.querySelector("#question-text"),
    answerButtons: document.querySelector("#answer-buttons"),
    hintButton: document.querySelector("#hint-button"),
    hintText: document.querySelector("#hint-text"),
    message: document.querySelector("#message"),
    resultMessage: document.querySelector("#result-message"),
    finalScore: document.querySelector("#final-score"),
    bestScore: document.querySelector("#best-score"),
    finalTime: document.querySelector("#final-time"),
    wrongReview: document.querySelector("#wrong-review"),
    playAgainButton: document.querySelector("#play-again-button")
  };

  function showScreen(screenName) {
    elements.startScreen.classList.toggle("hidden", screenName !== "start");
    elements.gameScreen.classList.toggle("hidden", screenName !== "game");
    elements.resultScreen.classList.toggle("hidden", screenName !== "result");
    document.body.classList.toggle("is-playing", screenName === "game");
  }

  function renderProgress(progress) {
    const playedText = progress.lastPlayedDate
      ? `Last played: ${progress.lastPlayedDate}`
      : "Ready for your first launch.";

    elements.savedProgress.textContent = `Best: ${progress.bestScore} stars. Total stars: ${progress.starsEarned}. ${playedText}`;
    renderWeakTables(progress);
  }

  function renderWeakTables(progress) {
    const weakTables = RocketMath.storage.getWeakTables(progress, 3);
    elements.weakTables.innerHTML = "";

    if (weakTables.length === 0) {
      elements.weakTables.textContent = "Tip: use hints when a table feels tricky.";
      return;
    }

    const label = document.createElement("p");
    label.textContent = "Practice these tables next:";
    elements.weakTables.appendChild(label);

    weakTables.forEach((item) => {
      const badge = document.createElement("span");
      badge.className = "table-badge";
      badge.textContent = `${item.table}x`;
      elements.weakTables.appendChild(badge);
    });
  }

  function renderQuestion(question, questionNumber, totalQuestions, score) {
    elements.questionNumber.textContent = questionNumber;
    elements.questionText.textContent = question.text;
    elements.score.textContent = score;
    elements.hintText.textContent = "";
    elements.message.textContent = "";
    elements.answerButtons.innerHTML = "";

    question.choices.forEach((answer) => {
      const button = document.createElement("button");
      button.className = "answer-button";
      button.type = "button";
      button.textContent = answer;
      button.setAttribute("aria-label", `Answer ${answer}`);
      elements.answerButtons.appendChild(button);
    });

    elements.questionText.setAttribute("aria-label", `Question ${questionNumber} of ${totalQuestions}: ${question.text}`);
  }

  function updateTimer(seconds) {
    elements.timer.textContent = seconds;
  }

  function updateScore(score) {
    elements.score.textContent = score;
    RocketMath.animation.pulse(elements.score);
  }

  function setAnswerButtonsDisabled(disabled) {
    elements.answerButtons.querySelectorAll("button").forEach((button) => {
      button.disabled = disabled;
    });
  }

  function markAnswer(chosenAnswer, correctAnswer) {
    elements.answerButtons.querySelectorAll("button").forEach((button) => {
      const value = Number(button.textContent);
      button.classList.toggle("correct", value === correctAnswer);
      button.classList.toggle("wrong", value === chosenAnswer && chosenAnswer !== correctAnswer);
    });
  }

  function showHint(hint) {
    elements.hintText.textContent = `Hint: ${safeText(hint)}.`;
  }

  function showMessage(message) {
    elements.message.textContent = safeText(message);
  }

  function renderResult(result, progress) {
    elements.finalScore.textContent = result.score;
    elements.bestScore.textContent = progress.bestScore;
    elements.finalTime.textContent = result.elapsedSeconds;
    elements.resultMessage.textContent = result.message;
    elements.wrongReview.innerHTML = "";

    if (result.wrongAnswers.length === 0) {
      const perfect = document.createElement("p");
      perfect.className = "perfect-message";
      perfect.textContent = "Perfect score! Every answer was correct.";
      elements.wrongReview.appendChild(perfect);
      return;
    }

    result.wrongAnswers.forEach((item) => {
      const reviewItem = document.createElement("div");
      reviewItem.className = "review-item";
      reviewItem.textContent = `${item.question} = ${item.correct}. You chose ${item.chosen}.`;
      elements.wrongReview.appendChild(reviewItem);
    });
  }

  RocketMath.ui = {
    elements,
    showScreen,
    renderProgress,
    renderQuestion,
    updateTimer,
    updateScore,
    setAnswerButtonsDisabled,
    markAnswer,
    showHint,
    showMessage,
    renderResult
  };

  window.RocketMath = RocketMath;
})();
