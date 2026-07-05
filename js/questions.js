(function () {
  "use strict";

  const RocketMath = window.RocketMath || {};
  const { randomNumber, shuffle } = RocketMath.utils;

  const LEVELS = {
    easy: { max: 5, label: "Easy" },
    medium: { max: 7, label: "Medium" },
    hard: { max: 9, label: "Hard" }
  };

  function getLevel(levelName) {
    return LEVELS[levelName] || LEVELS.easy;
  }

  function createQuestion(levelName) {
    const level = getLevel(levelName);
    const first = randomNumber(1, level.max);
    const second = randomNumber(1, level.max);
    const answer = first * second;

    return {
      first,
      second,
      answer,
      table: Math.max(first, second),
      text: `${first} x ${second} = ?`,
      hint: buildHint(first, second),
      choices: createAnswerChoices(answer, level.max)
    };
  }

  function createAnswerChoices(correctAnswer, levelMax) {
    const choices = new Set([correctAnswer]);
    const nearbyOffsets = [-10, -5, -3, -2, -1, 1, 2, 3, 5, 10];
    let attempts = 0;

    while (choices.size < 4 && attempts < 80) {
      attempts += 1;
      const useNearby = Math.random() > 0.25;
      const candidate = useNearby
        ? correctAnswer + nearbyOffsets[randomNumber(0, nearbyOffsets.length - 1)]
        : randomNumber(1, levelMax) * randomNumber(1, levelMax);

      if (candidate > 0 && candidate <= 99) {
        choices.add(candidate);
      }
    }

    while (choices.size < 4) {
      choices.add(randomNumber(1, 99));
    }

    return shuffle([...choices]);
  }

  function buildHint(first, second) {
    const groups = Array.from({ length: second }, () => first).join(" + ");
    return `${second} groups of ${first}: ${groups}`;
  }

  RocketMath.questions = {
    LEVELS,
    getLevel,
    createQuestion
  };

  window.RocketMath = RocketMath;
})();
