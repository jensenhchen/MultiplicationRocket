# Test Plan

## Desktop Browser Test Cases

- Open `index.html` in Chrome, Edge, Firefox, and Safari where available.
- Confirm the start screen loads with Easy, Medium, and Hard buttons.
- Confirm there is no horizontal scrolling at 320px, 375px, 390px, 430px, 768px, 1024px, and desktop widths.
- Start each level and confirm questions stay within the correct table range.
- Answer correctly and confirm score increases by 10.
- Answer incorrectly and confirm the correct answer is shown.
- Confirm the rocket idles, boosts on correct answers, shakes on wrong answers, and celebrates at mission complete.
- Confirm sound effects play only after the first user interaction.
- Confirm Sound On/Off and Music On/Off toggles work.
- Finish a mission and confirm score, best score, time, and review display.
- Use keyboard number keys to select visible single-digit answers.
- Confirm there are no browser console errors.

## iPad Safari Test Cases

- Open the GitHub Pages URL in iPad Safari.
- Confirm the layout fits iPad Mini, iPad Air, iPad Pro 11-inch, and iPad Pro 13-inch screen sizes.
- Confirm buttons are easy to tap and at least 60px tall.
- Confirm Safari safe areas do not cover content.
- Play a full mission in portrait.
- Play a full mission in landscape.
- Confirm the Sound and Music settings persist after closing and reopening the Home Screen app.

## Add To Home Screen Test

- Open the game in iPad Safari.
- Tap Share > Add to Home Screen.
- Confirm the name appears as `Rocket Math`.
- Launch from the Home Screen icon.
- Confirm the app opens in standalone mode without Safari browser chrome.

## Offline Test

- Load the GitHub Pages URL while online.
- Wait at least 5 seconds for the service worker to install.
- Turn on Airplane Mode.
- Reopen the installed Home Screen app.
- Confirm the game loads and can start a mission.
- Open a missing page while offline and confirm the offline fallback appears.

## Rotation Test

- Start a game in portrait and rotate to landscape.
- Confirm question, answer buttons, score, timer, hint, and rocket remain visible.
- Rotate back to portrait and confirm there is no overlap or clipped text.

## Touch Button Test

- Tap each level button.
- Tap each answer position.
- Tap Show hint.
- Tap Play again.
- Confirm no double-tap zoom occurs during normal play.
- Confirm accidental text selection does not happen during gameplay.

## localStorage Test

- Play one mission with at least one wrong answer.
- Return to the start screen.
- Confirm best score, total stars, and last played date are shown.
- Confirm weak table badges appear after wrong answers.
- Toggle sound and music settings, reload the page, and confirm the settings are restored.
- Reload the page and confirm progress is restored.
- Tap Reset progress and confirm saved progress clears.
