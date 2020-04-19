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
    'images/enemy1.png',
    'images/enemy_bullet.png',
  ];
  loadImages(PATHS, main);
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
  const GAME_LAYER = document.getElementById('game');
  const UI_LAYER = document.getElementById('ui');
  const GAME = new Game(GAME_LAYER, UI_LAYER, 800, 600, images);
  GAME.init();
}
