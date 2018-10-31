# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2018.10.31

### Added

This version is a basic implementation of the given requirements.

- Users can control the player with arrow keys. All keys need to be pressed continuously otherwise the player would stop at once.
- The user cannot move the player out of the canvas.
- There will be 1--6 enemies (randomly generated), with different positions and speeds. All enemies will move at a constant speed. They will disappear for a while when they enter either the left or the right of the canvas, and then reappear, moving backward.
- When the player is hit by an enemy, an alert will appear, showing the user how many times he/she has lost. After closing the alert, the game will restart.
- When the player reach the water, another alert will appear, showing the user how many times he/she has won. After closing the alert, the game will restart.