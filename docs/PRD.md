# Product Requirements Document

## Product

Multiplication Rocket is a static browser game that helps a 7-year-old child practice multiplication facts from 1x1 to 9x9.

## Goals

- Make multiplication practice friendly, fast, and encouraging.
- Work on iPad Safari and as an iPad Home Screen app.
- Work offline after the first successful online load.
- Deploy cleanly to GitHub Pages with relative paths.

## Audience

- Primary: children around age 7 learning multiplication.
- Secondary: parents, guardians, and teachers who want a no-login practice tool.

## Core Gameplay

- Child chooses Easy, Medium, or Hard.
- Game asks 10 multiplication questions.
- Child picks one of four answers.
- Correct answers earn 10 stars.
- Incorrect answers show the right answer and appear in review.
- Hints explain multiplication as repeated addition.
- Rocket moves upward as the score increases.

## Levels

- Easy: tables 1 to 5
- Medium: tables 1 to 7
- Hard: tables 1 to 9

## Persistence

Use `localStorage` to save:

- Best score
- Total stars earned
- Wrong questions
- Weak multiplication tables
- Last played date
- Games played

## Technical Constraints

- HTML5, CSS3, and vanilla JavaScript only
- No backend
- No login
- No database
- No npm or build tools
- No external CDN libraries
- No paid API
- Compatible with GitHub Pages subfolder deployment

## PWA Requirements

- Valid web app manifest
- Service worker cache for offline play
- iPad Home Screen metadata and icon
- Safe-area and touch-friendly layout
