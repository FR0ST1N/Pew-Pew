# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.0] - 2020-04-19

### Added

- Repo link at start screen UI.
- `--ignoreJsErrors` can now be passes as argument to ignore JS linting errors.
- Resource Loader.
- Separate canvas for game and UI.
- `CC-BY-SA-4.0` license for images.
- Basic level progression with 2 stages.

### Changed

- Most classes have been refactored/rewritten.
- A lot of dependency updates.

### Removed

- Unused classes/files have been removed as part of the refactor/rewrite.
- Removed CI.

## [v1.0.0-alpha.2] - 2019-11-14

### Added

- Enemies now spawn out of bounds and fly into canvas.
- New lint rules:
  - `space-infix-ops`.
  - `operator-linebreak`.
  - `new-parens`.
- Game controls in start screen UI.
- CI initial config.

### Changed

- Bullet movement logic moved to `bulletMovement.js`.
- ESLint config moved to `.eslintrc`.
- Color for score in game over screen.
- Dependency updates:
  - gulp-imagemin `6.1.0` to `6.1.1`.
  - gulp-zip `5.0.0` to `5.0.1`.
- Turned off JSDoc verbose output.

### Removed

- UI transparency during gameplay.
- `src/images/enemy2.png`.

## [v1.0.0-alpha.1] - 2019-10-26

### Added

- Font for `.` and `-` characters.
- Game start and game over screens.
- Doc generation with `genDocs` command and included it in `build`.
- Game score.
- New sound effect for UI.
- Changelog.

### Changed

- Zip file name changed to `Pew-Pew.zip`.
- `jsLint` task now fails after error.
- Tweaked enemy spawn position.
- Enemy bullet size reduced from `10` to `5`.
- Enemy size reduced from `3` to `2`.
- New player fire sound effect.
- Changed master volume of all sound effects to `0.5`.
- Readme updates.

### Fixed

- Input on non-US keyboards by [@depp](https://github.com/depp).
- Position error.
- Destroy player barrier when bullet count is max.
- Game restart on input after game over.

## [1.0.0-alpha] - 2019-09-13

### Added

- Prototype for [Js13kGames](https://js13kgames.com/).

[unreleased]: https://github.com/FR0ST1N/Pew-Pew/compare/master...develop
[v1.0.0]: https://github.com/FR0ST1N/Pew-Pew/compare/v1.0.0-alpha.2...v1.0.0
[v1.0.0-alpha.2]: https://github.com/FR0ST1N/Pew-Pew/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[v1.0.0-alpha.1]: https://github.com/FR0ST1N/Pew-Pew/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/FR0ST1N/Pew-Pew/releases/tag/v1.0.0-alpha
