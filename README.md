![Pew-Pew](https://github.com/FR0ST1N/Pew-Pew/blob/master/banner.png "Pew-Pew")

![GitHub](https://img.shields.io/github/license/FR0ST1N/Pew-Pew) ![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/FR0ST1N/Pew-Pew?include_prereleases)

# Description

Meet Koko! Your average girl with the power to make a barrier around her and absorb bullet's energy when it hits the barrier. She can also use the adsorbed energy to fire back at the enemies.

# [Play Game](https://fr0st1n.github.io/Pew-Pew/)

## Links

* [Web (Hosted in GitHub pages)](https://fr0st1n.github.io/Pew-Pew/)
* [Download zip of the latest release](https://github.com/FR0ST1N/Pew-Pew/releases)
* [Build from source](#build-from-source)

## Controls

| Button  | Description |
| ------------- | ------------- |
| Space  | Start / Play Again  |
| Arrow Keys | Movement  |
| z | Barrier  |
| x  | Pew  |

## Build From Source

1. Clone the repository
2. Install dependencies using `npm install`
3. Install [`gulp`](https://github.com/gulpjs/gulp) globally (optional)
4. `gulp build` to build the game
5. Open `index.html` inside `build` directory to play

# Development

## Follow the development [trello](https://trello.com/b/LoGXtFYM)

## [Docs](https://fr0st1n.github.io/Pew-Pew/docs/)

## Gulp Commands

* `gulp watch`
    * Watch files for changes
    * Shows lint errors and builds on change
* `gulp lint`
    * Shows lint errors
* `gulp jsLintNoConcat`
    * Shows JS lint errors without minifying and concatenating code
* `gulp build`
    * Shows HTML, CSS and JS lint errors
    * Minifies code and images in `src` directory
    * Concat files after minification
    * Puts the output files in `build` directory
    * Zips `build` directory and puts the zip in `zip` directory
    * Generates docs to `build/docs/`

# License

[**GPL-3.0**](https://github.com/FR0ST1N/Pew-Pew/blob/master/LICENSE)
