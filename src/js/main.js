/*
 * Pew-Pew
 * Copyright (C) 2019 Frostin
 *
 * This file is part of Pew-Pew.
 *
 * Pew-Pew is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pew-Pew is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pew-Pew.  If not, see <http://www.gnu.org/licenses/>.
 */

/** @file Main entry file. */
window.onload = function() {
  const PATHS = [
    'images/player.png',
    'images/player_bullet.png',
    'images/ui_heart.png',
    'images/ui_bullet_holder.png',
    'images/logo.png',
    'images/enemy_bullet.png',
    'images/enemy1.png',
  ];
  loadImages(PATHS, main);

  const crateImageElement = (path) => {
    const image = new Image();
    image.src = path;
    return image;
  };

  window.enemyOneSprite = {
    'image': crateImageElement('images/enemy1.png'),
    'rows': '2',
    'columns': '2',
    'totalSpriteSize': '128',
    'individualSpriteSize': '32',
    'position': {'x': 0, 'y': 0},
    'scaleFactorX': 2,
    'scaleFactorY': 2,
  };

  window.enemyBulletSprite = {
    'image': crateImageElement('images/enemy_bullet.png'),
    'rows': '1',
    'columns': '5',
    'totalSpriteSize': '5',
    'individualSpriteSize': '5',
    'position': {'x': 0, 'y': 0},
    'scaleFactorX': 5,
    'scaleFactorY': 5,
  };

  window.playerBulletSprite = {
    'image': crateImageElement('images/player_bullet.png'),
    'rows': '1',
    'columns': '5',
    'totalSpriteSize': '5',
    'individualSpriteSize': '5',
    'position': {'x': 0, 'y': 0},
    'scaleFactorX': 10,
    'scaleFactorY': 10,
  };
};


/**
 * Image loading function.
 * @param {string[]} paths Image paths.
 * @param {mainCallback} cb Callback after images have been loaded.
 */
function loadImages(paths, cb) {
  /* NOTE: Not tested yet. */
  const IMAGES = [];
  let loaded = 0;
  for (let i = 0; i < paths.length; i++) {
    IMAGES[i] = new Image();
    IMAGES[i].onload = function() {
      if (++loaded >= paths.length) {
        cb(IMAGES);
      }
    };
    IMAGES[i].src = paths[i];
  }
}

/**
 * Main entry to game.
 * @callback mainCallback
 * @param {HTMLImageElement[]} images Array of loaded images.
 */
function main(images) {
  const CANVAS = document.getElementById('game');
  const GAME = new Game(CANVAS, 800, 600, images);
  GAME.init();
}
