# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.0-alpha.1] - 2019-10-26

### Added

- Font for `.` character.
- Game start and game over screens.
- Doc generation with `genDocs` command and included it in `build`.
- Game score.
- New sound effect for UI.

### Changed

- Zip file name changed to `Pew-Pew.zip`.
- `jsLint` task now fails after error.
- Tweaked enemy spawn position.
- Enemy bullet size reduced from `10` to `5`.
- Enemy size reduced from `3` to `2`.
- New player fire sound effect.
- Changed master volume of all sound effects to `0.5`.

### Fixed

- Input on non-US keyboards by [@depp](https://github.com/depp).
- Position error.
- Destroy player barrier when bullet count is max.
- Game restart on input after game over.

## [1.0.0-alpha] - 2019-09-13

### Added

- Prototype for [Js13kGames](https://js13kgames.com/).

[unreleased]: https://github.com/FR0ST1N/Pew-Pew/compare/master...develop
[v1.0.0-alpha.1]: https://github.com/FR0ST1N/Pew-Pew/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/FR0ST1N/Pew-Pew/releases/tag/v1.0.0-alpha
