# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0]

### Added

- Background music which will be played faster at higher levels.
- Sound effects for crashes and level-ups.
- Users can press P to pause the game, and press any other key to resume. Game will be automatically paused when users lose a game.
- Users can press A to open character-introduction panel, press LEFT or RIGHT to surf, and press X to close.

### Changed

- Player movement has acceleration now.

### Refactored

- The source code is completely refactored. Now it is much more structured.

## [0.2.0] - 2018.11.02

### Added

- Users can select which character to use after reaching certain level.
- Use hearts to represent remaining lives.
- Show levels and best score.
- Difficulty will increase with levels.

## [0.1.1] - 2018.10.31

### Fixed

- Fixed a bug which caused the player to keep moving after the arrow key had been released.

## [0.1.0] - 2018.10.31

### Added

This version is a basic implementation of the given requirements.

- Users can control the player with arrow keys. All keys need to be pressed continuously otherwise the player would stop at once.
- The user cannot move the player out of the canvas.
- There will be 1--6 enemies (randomly generated), with different positions and speeds. All enemies will move at a constant speed. They will disappear for a while when they enter either the left or the right of the canvas, and then reappear, moving backward.
- When the player is hit by an enemy, an alert will appear, showing the user how many times he/she has lost. After closing the alert, the game will restart.
- When the player reach the water, another alert will appear, showing the user how many times he/she has won. After closing the alert, the game will restart.