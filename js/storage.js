(function () {
  "use strict";

  const RocketMath = window.RocketMath || {};
  const STORAGE_KEY = "multiplicationRocket.progress.v1";

  const defaultProgress = {
    bestScore: 0,
    starsEarned: 0,
    wrongQuestions: [],
    weakTables: {},
    lastPlayedDate: "",
    gamesPlayed: 0
  };

  function loadProgress() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...defaultProgress };

      return normalizeProgress(JSON.parse(saved));
    } catch (error) {
      return { ...defaultProgress };
    }
  }

  function saveProgress(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
    } catch (error) {
      // Private browsing or full storage should not stop the child from playing.
    }
  }

  function resetProgress() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Ignore storage errors and keep the game playable.
    }

    return { ...defaultProgress };
  }

  function recordGameResult(currentProgress, result) {
    const progress = normalizeProgress(currentProgress);
    const wrongQuestions = result.wrongAnswers.map((item) => ({
      question: item.question,
      correct: item.correct,
      chosen: item.chosen,
      table: item.table,
      playedAt: result.playedAt
    }));

    wrongQuestions.forEach((item) => {
      progress.weakTables[item.table] = (progress.weakTables[item.table] || 0) + 1;
    });

    progress.bestScore = Math.max(progress.bestScore, result.score);
    progress.starsEarned += result.score;
    progress.wrongQuestions = [...wrongQuestions, ...progress.wrongQuestions].slice(0, 20);
    progress.lastPlayedDate = result.playedAt;
    progress.gamesPlayed += 1;

    saveProgress(progress);
    return progress;
  }

  function getWeakTables(progress, maxItems) {
    return Object.entries(normalizeProgress(progress).weakTables)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxItems)
      .map(([table, count]) => ({ table: Number(table), count }));
  }

  function normalizeProgress(progress) {
    return {
      bestScore: Number(progress.bestScore) || 0,
      starsEarned: Number(progress.starsEarned) || 0,
      wrongQuestions: Array.isArray(progress.wrongQuestions) ? progress.wrongQuestions : [],
      weakTables: progress.weakTables && typeof progress.weakTables === "object" ? progress.weakTables : {},
      lastPlayedDate: progress.lastPlayedDate || "",
      gamesPlayed: Number(progress.gamesPlayed) || 0
    };
  }

  RocketMath.storage = {
    loadProgress,
    saveProgress,
    resetProgress,
    recordGameResult,
    getWeakTables
  };

  window.RocketMath = RocketMath;
})();
