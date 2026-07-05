(function () {
  "use strict";

  const RocketMath = window.RocketMath || {};

  function moveRocket(rocketElement, progressRatio) {
    if (!rocketElement) return;

    const safeProgress = Math.max(0, Math.min(1, progressRatio));
    rocketElement.style.bottom = `${10 + safeProgress * 72}%`;
    rocketElement.classList.remove("rocket-boost");
    window.requestAnimationFrame(() => rocketElement.classList.add("rocket-boost"));
  }

  function pulse(element) {
    if (!element) return;

    element.classList.remove("pulse");
    window.requestAnimationFrame(() => element.classList.add("pulse"));
  }

  RocketMath.animation = {
    moveRocket,
    pulse
  };

  window.RocketMath = RocketMath;
})();
