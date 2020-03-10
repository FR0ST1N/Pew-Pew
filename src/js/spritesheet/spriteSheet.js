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

/** @file Class to handle sprite sheets. */
class SpriteSheet {
  /**
   * @param {string} image Sprite sheet location.
   * @param {number} spriteSize Source sprite size(x = y).
   */
  constructor(image, spriteSize) {
    this.image = image;
    this.spriteSize = spriteSize;
    this.sprites = [];
  }

  /**
   * @typedef {Object} sprite
   * @property {string} name
   * @property {number} x
   * @property {number} y
   */

  /**
   * Add sprite from the sheet.
   * Name must be unique.
   * @param {sprite} sprite
   */
  addSprite(sprite) {
    this.sprites.push({
      name: sprite.name,
      x: sprite.x,
      y: sprite.y,
    });
  }

  /**
   * Add Sprites in bulk.
   * @param {string[]} names
   * @param {number} rows
   * @param {number} columns
   */
  addSpriteBulk(names, rows, columns) {
    if (rows * columns === names.length) {
      let index = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          this.addSprite({
            name: names[index++],
            x: j * this.spriteSize,
            y: i * this.spriteSize,
          });
        }
      }
    }
  }

  /**
   * Get the position for sprite.
   * @param {string} name Sprite name.
   * @return {sprite|undefined}
   */
  getSprite(name) {
    for (const S of this.sprites) {
      if (S.name === name) {
        return S;
      }
    }
  }

  /**
   * Get the position for sprite.
   * @param {string} name Sprite name.
   * @return {Position}
   */
  getSpritePosition(name) {
    for (const S of this.sprites) {
      if (S.name === name) {
        return new Position(S.x, S.y);
      }
    }
  }
}
