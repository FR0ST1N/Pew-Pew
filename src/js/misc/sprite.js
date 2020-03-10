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

/** @file Sprite class for enemies */
class Sprite {
/**
 * Properties of each image sprite
 * @param {string} imagename
 * @param {number} rows
 * @param {number} columns
 * @param {number} totalSpriteSize
 * @param {number} individualSpriteSize
 * @param {Position} position - position of one image inside sprite.start-(0,0)
 * @param {number} scaleFactorX
 * @param {number} scaleFactorY
 */
  constructor(imagename, rows, columns,
      totalSpriteSize = 96,
      individualSpriteSize = 32,
      position,
      scaleFactorX = 3,
      scaleFactorY = 3) {
    const image = new Image();
    image.src = 'images/' + imagename;
    this.image = image;
    this.rows = rows;
    this.columns = columns;
    this.individualSpriteSize = individualSpriteSize;
    this.totalSpriteSize = totalSpriteSize;
    this.position = position;
    this.scaleFactorX = scaleFactorX;
    this.scaleFactorY = scaleFactorY;
  }
}

/**
 * Multiple images inside sprite are are
 * animated with the help of this SpriteConfig
 */
class SpriteConfig {
  /**
   * sprite config, for animations.
   * @param {Array} motion1
   * @param {Array} motion2
   * @param {Sprite} sprite
   */
  constructor(motion1 = [], motion2 = [], sprite) {
    this.MOTION_1 = motion1;
    this.MOTION_2 = motion2;
    this.spriteSheet = null;
    this.sprite = sprite;
    this._extractSprites();
  }

  /**
   * uses sprite_sheet and exports the data inside spriteConfig
   */
  _extractSprites() {
    let spriteNames = this.MOTION_1.slice(0);
    spriteNames = spriteNames.concat(this.MOTION_2);
    this.spriteSheet = new SpriteSheet(this.sprite.image,
        this.sprite.individualSpriteSize);
    this.spriteSheet.addSpriteBulk(spriteNames,
        this.sprite.rows, this.sprite.columns);
  }
}
