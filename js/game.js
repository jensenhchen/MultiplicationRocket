(function () {
  "use strict";

  const RocketMath = window.RocketMath || {};
  const TOTAL_QUESTIONS = 10;
  const POINTS_PER_CORRECT = 10;
  const ANSWER_DELAY_MS = 1000;

  const encouragements = [
    "Stars! Great Job!",
    "Rocket boost! Awesome!",
    "Fantastic!",
    "Rocket boost!",
    "Keep flying!",
    "Nice thinking!"
  ];

  const state = {
    levelName: "easy",
    questionNumber: 0,
    score: 0,
    currentQuestion: null,
    wrongAnswers: [],
    startTime: 0,
    timerId: null,
    acceptingAnswers: false,
    progress: null
  };

  function init(progress) {
    state.progress = progress;
    RocketMath.ui.renderProgress(state.progress);
    RocketMath.ui.showScreen("start");
  }

  function start(levelName) {
    state.levelName = RocketMath.questions.LEVELS[levelName] ? levelName : "easy";
    state.questionNumber = 0;
    state.score = 0;
    state.wrongAnswers = [];
    state.currentQuestion = null;
    state.acceptingAnswers = false;
    state.startTime = Date.now();

    clearInterval(state.timerId);
    state.timerId = window.setInterval(updateTimer, 1000);
    updateTimer();
    RocketMath.ui.updateScore(state.score);
    RocketMath.animation.moveRocket(RocketMath.ui.elements.rocket, 0);
    RocketMath.animation.setRocketState(RocketMath.ui.elements.rocket, "idle");
    RocketMath.ui.showScreen("game");
    nextQuestion();
  }

  function nextQuestion() {
    state.questionNumber += 1;

    if (state.questionNumber > TOTAL_QUESTIONS) {
      end();
      return;
    }

    state.currentQuestion = RocketMath.questions.createQuestion(state.levelName);
    state.acceptingAnswers = true;

    RocketMath.ui.renderQuestion(
      state.currentQuestion,
      state.questionNumber,
      TOTAL_QUESTIONS,
      state.score
    );
    RocketMath.animation.setRocketState(RocketMath.ui.elements.rocket, "idle");
  }

  function answer(chosenAnswer) {
    if (!state.acceptingAnswers || !state.currentQuestion) return;

    const answerNumber = Number(chosenAnswer);
    const isCorrect = answerNumber === state.currentQuestion.answer;

    state.acceptingAnswers = false;
    RocketMath.ui.setAnswerButtonsDisabled(true);
    RocketMath.ui.markAnswer(answerNumber, state.currentQuestion.answer);

    if (isCorrect) {
      state.score += POINTS_PER_CORRECT;
      RocketMath.ui.updateScore(state.score);
      RocketMath.animation.moveRocket(
        RocketMath.ui.elements.rocket,
        state.score / (TOTAL_QUESTIONS * POINTS_PER_CORRECT)
      );
      RocketMath.animation.setRocketState(RocketMath.ui.elements.rocket, "correct");
      RocketMath.audio.play("correct");
      RocketMath.audio.play("boost");
      RocketMath.ui.showMessage(encouragements[RocketMath.utils.randomNumber(0, encouragements.length - 1)]);
    } else {
      RocketMath.animation.setRocketState(RocketMath.ui.elements.rocket, "wrong");
      RocketMath.audio.play("wrong");
      RocketMath.ui.showMessage(`Good try! The answer is ${state.currentQuestion.answer}.`);
      state.wrongAnswers.push({
        question: `${state.currentQuestion.first} x ${state.currentQuestion.second}`,
        correct: state.currentQuestion.answer,
        chosen: answerNumber,
        table: state.currentQuestion.table
      });
    }

    window.setTimeout(nextQuestion, ANSWER_DELAY_MS);
  }

  function showHint() {
    if (!state.currentQuestion) return;
    RocketMath.ui.showHint(state.currentQuestion.hint);
  }

  function end() {
    clearInterval(state.timerId);
    state.acceptingAnswers = false;

    const result = {
      score: state.score,
      elapsedSeconds: getElapsedSeconds(),
      wrongAnswers: state.wrongAnswers,
      playedAt: RocketMath.utils.todayString(),
      message: getResultMessage()
    };

    state.progress = RocketMath.storage.recordGameResult(state.progress, result);
    RocketMath.animation.setRocketState(RocketMath.ui.elements.rocket, "complete");
    RocketMath.audio.play(state.score === TOTAL_QUESTIONS * POINTS_PER_CORRECT ? "applause" : "complete");
    RocketMath.ui.renderResult(result, state.progress);
    RocketMath.ui.renderProgress(state.progress);
    RocketMath.ui.showScreen("result");
  }

  function resetProgress() {
    state.progress = RocketMath.storage.resetProgress();
    RocketMath.ui.renderProgress(state.progress);
  }

  function showStart() {
    clearInterval(state.timerId);
    RocketMath.ui.updateTimer(0);
    RocketMath.ui.renderProgress(state.progress);
    RocketMath.ui.showScreen("start");
  }

  function updateTimer() {
    RocketMath.ui.updateTimer(getElapsedSeconds());
  }

  function getElapsedSeconds() {
    if (!state.startTime) return 0;
    return Math.floor((Date.now() - state.startTime) / 1000);
  }

  function getResultMessage() {
    if (state.score === TOTAL_QUESTIONS * POINTS_PER_CORRECT) {
      return "Amazing flight! You reached the brightest star.";
    }

    if (state.score >= 70) {
      return "Strong mission! A little practice will make it even smoother.";
    }

    return "Good effort! Try again and watch your rocket climb higher.";
  }

  RocketMath.game = {
    init,
    start,
    answer,
    showHint,
    resetProgress,
    showStart
  };

  window.RocketMath = RocketMath;
})();
