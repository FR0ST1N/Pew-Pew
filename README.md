# Pew-Pew

![Pew-Pew](banner.png "Pew-Pew")

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/FR0ST1N/Pew-Pew?color=260016&include_prereleases&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/FR0ST1N/Pew-Pew?color=260016&style=for-the-badge)

## Table of Contents

- [Pew-Pew](#pew-pew)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Play Game](#play-game)
    - [Links](#links)
    - [Controls](#controls)
  - [Development](#development)
    - [Docs](#docs)
    - [Gulp Commands](#gulp-commands)
    - [Size](#size)
  - [Build From Source](#build-from-source)
  - [Contributing](#contributing)
    - [Workflow](#workflow)
    - [Code Style (JavaScript)](#code-style-javascript)
  - [Changelog](#changelog)
  - [License](#license)

## Description

Meet Koko! Your average girl with the power to make a barrier around her and absorb bullet's energy when it hits the barrier. She can also use the adsorbed energy to fire back at the enemies.

## Play Game

### Links

- [Web (Hosted in GitHub pages)](https://fr0st1n.github.io/Pew-Pew/).
- [Download zip of the latest release](https://github.com/FR0ST1N/Pew-Pew/releases).
- [Build from source](#build-from-source).

### Controls

| Button     | Description        |
| ---------- | ------------------ |
| Space      | Start / Play Again |
| Arrow Keys | Movement           |
| z          | Barrier            |
| x          | Pew                |

## Development

### Docs

[Click here](https://fr0st1n.github.io/Pew-Pew/docs/) to see docs.

### Gulp Commands

- `gulp watch`
    1. Watch files for changes.
    2. Shows lint errors and builds on change.
- `gulp lint`
    1. Shows lint errors.
- `gulp jsLintNoConcat`
    1. Shows JS lint errors without minifying and concatenating code.
- `gulp build`
    1. Shows HTML, CSS and JS lint errors.
    2. Build will fail if there are any JS lint errors.
    3. Minifies the code and images from `src` directory.
    4. Concat files after minification.
    5. Puts the output files in `build` directory.
    6. Zips `build` directory and puts the zip in `zip` directory.
    7. Generates docs to `build/docs/`.

### Size

This game was originally developed as a prototype for [Js13kGames](https://js13kgames.com/).

> Js13kGames is a JavaScript coding competition for HTML5 Game Developers.
> The fun part of the competition is the file size limit set to 13 kilobytes.

So make sure the zip size is below **13 kilobytes**. The `gulp build` command will show warning when zip size exceeds 13 kilobytes.

## Build From Source

Install [Node.js](https://nodejs.org/en/) and [git](https://git-scm.com/) then run the following commands:

```shellscript
git clone https://github.com/FR0ST1N/Pew-Pew.git
cd Pew-Pew
npm install
npx gulp build
```

- Open `build/index.html` and play.
- Zipped game can be found in `zip` directory.

## Contributing

### Workflow

1. Fork the repo.
2. Create a branch.
3. Make changes.
4. Submit a pull request.
  
Open an issue if you want to discuss something and check for lint errors before making a pull request.

### Code Style (JavaScript)

Follow [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

[**GPL-3.0**](https://github.com/FR0ST1N/Pew-Pew/blob/master/LICENSE)
