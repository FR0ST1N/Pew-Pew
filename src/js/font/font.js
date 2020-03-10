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

/**
 * @file Pixel art font lib for canvas.
 * Modified ver. of PaulBGD's PixelFont repo.
 */
class Font {
  /**
   * Returns pixel representation of each chars in given string.
   * @param {string} string
   * @param {number} size
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   */
  static draw(string, size, ctx, x, y) {
    const CHAR_ARR = this._getChars(string);
    let currX = x;
    for (let i = 0; i < CHAR_ARR.length; i++) {
      const LETTER = CHAR_ARR[i];
      let currY = y;
      let addX = 0;
      for (let y = 0; y < LETTER.length; y++) {
        const row = LETTER[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x]) {
            ctx.fillRect(currX + x * size, currY, size, size);
          }
        }
        addX = Math.max(addX, row.length * size);
        currY += size;
      }
      currX += size + addX;
    }
  }

  /**
   * Gets char array to draw.
   * @param {string} string
   * @return {Array.<boolean[]>}
   */
  static _getChars(string) {
    const LETTERS = {
      'A': [
        [, 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
      ],
      'B': [
        [1, 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, 1],
      ],
      'C': [
        [1, 1, 1],
        [1],
        [1],
        [1],
        [1, 1, 1],
      ],
      'D': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1],
      ],
      'E': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [1],
        [1, 1, 1],
      ],
      'F': [
        [1, 1, 1],
        [1],
        [1, 1],
        [1],
        [1],
      ],
      'G': [
        [, 1, 1],
        [1],
        [1, , 1, 1],
        [1, , , 1],
        [, 1, 1],
      ],
      'H': [
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
      ],
      'I': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [1, 1, 1],
      ],
      'J': [
        [1, 1, 1],
        [, , 1],
        [, , 1],
        [1, , 1],
        [1, 1, 1],
      ],
      'K': [
        [1, , , 1],
        [1, , 1],
        [1, 1],
        [1, , 1],
        [1, , , 1],
      ],
      'L': [
        [1],
        [1],
        [1],
        [1],
        [1, 1, 1],
      ],
      'M': [
        [1, 1, 1, 1, 1],
        [1, , 1, , 1],
        [1, , 1, , 1],
        [1, , , , 1],
        [1, , , , 1],
      ],
      'N': [
        [1, , , 1],
        [1, 1, , 1],
        [1, , 1, 1],
        [1, , , 1],
        [1, , , 1],
      ],
      'O': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
      ],
      'P': [
        [1, 1, 1],
        [1, , 1],
        [1, 1, 1],
        [1],
        [1],
      ],
      'Q': [
        [0, 1, 1],
        [1, , , 1],
        [1, , , 1],
        [1, , 1, 1],
        [1, 1, 1, 1],
      ],
      'R': [
        [1, 1],
        [1, , 1],
        [1, , 1],
        [1, 1],
        [1, , 1],
      ],
      'S': [
        [1, 1, 1],
        [1],
        [1, 1, 1],
        [, , 1],
        [1, 1, 1],
      ],
      'T': [
        [1, 1, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1],
      ],
      'U': [
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
      ],
      'V': [
        [1, , , , 1],
        [1, , , , 1],
        [, 1, , 1],
        [, 1, , 1],
        [, , 1],
      ],
      'W': [
        [1, , , , 1],
        [1, , , , 1],
        [1, , , , 1],
        [1, , 1, , 1],
        [1, 1, 1, 1, 1],
      ],
      'X': [
        [1, , , , 1],
        [, 1, , 1],
        [, , 1],
        [, 1, , 1],
        [1, , , , 1],
      ],
      'Y': [
        [1, , 1],
        [1, , 1],
        [, 1],
        [, 1],
        [, 1],
      ],
      'Z': [
        [1, 1, 1, 1, 1],
        [, , , 1],
        [, , 1],
        [, 1],
        [1, 1, 1, 1, 1],
      ],
      '0': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
      ],
      '1': [
        [, 1],
        [, 1],
        [, 1],
        [, 1],
        [, 1],
      ],
      '2': [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ],
      '3': [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      '4': [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      '5': [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      '6': [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      '7': [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      '8': [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      '9': [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      ' ': [
        [0],
        [0],
        [0],
        [0],
        [0],
      ],
      '.': [
        [0],
        [0],
        [0],
        [0],
        [1],
      ],
      '-': [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    const CHAR_ARR = [];
    string = string.toUpperCase();
    for (let i = 0; i < string.length; i++) {
      const LETTER = LETTERS[string.charAt(i)];
      if (LETTER) {
        CHAR_ARR.push(LETTER);
      }
    }
    return CHAR_ARR;
  }
}
