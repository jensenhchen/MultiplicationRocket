# Multiplication Rocket

Multiplication Rocket is a simple browser game for children learning 1x1 to 9x9 multiplication. The child picks a mission level, answers 10 questions, earns stars, gets hints, reviews mistakes, and watches the rocket climb.

The project is static and GitHub Pages friendly. It uses only HTML5, CSS3, and vanilla JavaScript. There is no backend, login, database, npm, build tool, CDN, or paid API.

## Features

- Easy, Medium, and Hard levels
- Score, timer, hints, encouraging messages, and wrong-answer review
- Rocket and star animation with `prefers-reduced-motion` support
- Saves best score, total stars, wrong questions, weak tables, and last played date in `localStorage`
- Installable Progressive Web App on iPad and supported desktop/mobile browsers
- Offline support after the first successful load
- Relative paths for GitHub Pages subfolder deployment

## Folder Structure

```text
/
├── index.html
├── manifest.json
├── service-worker.js
├── offline.html
├── 404.html
├── README.md
├── LICENSE
├── robots.txt
├── .nojekyll
├── css/
├── js/
├── assets/
└── docs/
```

## Run Locally

Open `index.html` in a browser for a quick check. Service workers require `https://` or `localhost`, so offline/PWA behavior should be tested with a local static server or on GitHub Pages.

Optional local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Upload To GitHub

1. Create a new repository named `MultiplicationRocket`.
2. Upload all project files and folders from this directory.
3. Commit the files to the default branch, usually `main`.

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save.

After GitHub finishes publishing, the app should work at:

```text
https://username.github.io/MultiplicationRocket/
```

## Open On iPad

1. Open Safari on the iPad.
2. Visit the GitHub Pages URL.
3. Play one mission while online so Safari can cache the app.

## Add To Home Screen On iPad

1. Open the game in Safari.
2. Tap the Share button.
3. Tap `Add to Home Screen`.
4. Confirm the name `Rocket Math`.
5. Launch it from the Home Screen icon.

## Test Offline Mode

1. Open the GitHub Pages URL while online.
2. Wait for the first page load to finish.
3. Play or start a mission.
4. Turn on Airplane Mode.
5. Reopen the Home Screen app or refresh the page. The game should still load from cache.

## Troubleshooting

- If offline mode does not work, reload once while online and wait a few seconds.
- If the Home Screen icon does not appear, confirm Safari is using the GitHub Pages `https://` URL.
- If old files appear after an update, close the tab or Home Screen app and reopen it. The service worker deletes old named caches during activation.
- If progress is missing, check whether Safari private browsing or storage restrictions are enabled.
